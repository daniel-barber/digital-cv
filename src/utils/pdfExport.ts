import { toPng } from "html-to-image";
import { PDFDocument, PDFName, PDFString } from "pdf-lib";

const isHttpUrl = (value: string) => /^https?:\/\//i.test(value);

const toAbsoluteUrl = (value: string) => {
  try {
    return new URL(value, window.location.href).href;
  } catch {
    return value;
  }
};

const proxyImageUrl = (absoluteUrl: string) => {
  const withoutProtocol = absoluteUrl.replace(/^https?:\/\//i, "");
  return `https://images.weserv.nl/?url=${encodeURIComponent(withoutProtocol)}`;
};

const fetchImageAsDataUrl = async (url: string) => {
  const attempt = async (targetUrl: string) => {
    const response = await fetch(targetUrl, {
      cache: "no-store",
      referrerPolicy: "no-referrer",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch image resource: ${response.status} ${response.statusText}`,
      );
    }

    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  try {
    return await attempt(url);
  } catch (error) {
    if (isHttpUrl(url)) {
      try {
        return await attempt(proxyImageUrl(url));
      } catch (proxyError) {
        console.warn("Failed to proxy image for export", proxyError);
      }
    }

    throw error;
  }
};

const waitForImageReady = async (img: HTMLImageElement) => {
  if (img.complete && img.naturalWidth !== 0) {
    try {
      if ("decode" in img) {
        await img.decode();
      }
    } catch (error) {
      console.warn(
        "Image decode failed, continuing with fallback load listener",
        error,
      );
    }
    return;
  }

  await new Promise<void>((resolve) => {
    const handleComplete = () => {
      img.removeEventListener("load", handleComplete);
      img.removeEventListener("error", handleComplete);
      resolve();
    };

    img.addEventListener("load", handleComplete, { once: true });
    img.addEventListener("error", handleComplete, { once: true });
  });
};

const inlineCssBackgrounds = async (root: HTMLElement) => {
  const replacements: Array<{
    element: HTMLElement;
    originalBackgroundImage: string;
  }> = [];
  const elements: HTMLElement[] = [
    root,
    ...Array.from(root.querySelectorAll<HTMLElement>("*")),
  ];

  for (const element of elements) {
    const computed = window.getComputedStyle(element);
    const backgroundImage = computed.backgroundImage;

    if (!backgroundImage || backgroundImage === "none") {
      continue;
    }

    const matches = Array.from(
      backgroundImage.matchAll(/url\((['"]?)([^'")\]]+)\1\)/g),
    );

    if (matches.length === 0) {
      continue;
    }

    let updatedBackgroundImage = backgroundImage;
    let didReplace = false;

    for (const match of matches) {
      const token = match[0];
      const url = match[2];

      if (!url || url.startsWith("data:") || url.startsWith("blob:")) {
        continue;
      }

      const absoluteUrl = toAbsoluteUrl(url);

      try {
        const dataUrl = await fetchImageAsDataUrl(absoluteUrl);
        updatedBackgroundImage = updatedBackgroundImage
          .split(token)
          .join(`url("${dataUrl}")`);
        didReplace = true;
      } catch (error) {
        console.warn("Failed to inline background image for export", error);
      }
    }

    if (didReplace) {
      replacements.push({
        element,
        originalBackgroundImage: element.style.backgroundImage,
      });

      element.style.backgroundImage = updatedBackgroundImage;
    }
  }

  return replacements;
};

export async function generatePDF(element: HTMLElement, fileName: string) {
  const htmlRoot = document.documentElement;
  htmlRoot.classList.add("cv-exporting");
  
  // Wait for layout to stabilize after adding cv-exporting class
  // This class shows the "View Live CV" link which causes a layout shift
  await new Promise((resolve) => setTimeout(resolve, 100));

  const imageReplacements: Array<{
    img: HTMLImageElement;
    originalSrcAttr: string | null;
    originalSrcset: string | null;
    originalSizes: string | null;
    originalLoading: string | null;
    originalCrossOrigin: string | null;
  }> = [];

  const backgroundReplacements: Array<{
    element: HTMLElement;
    originalBackgroundImage: string;
  }> = [];

  try {
    // First, ensure ALL images are fully loaded and decoded
    const images = Array.from(element.querySelectorAll("img"));
    
    // Wait for all images to be ready first
    await Promise.all(images.map(img => waitForImageReady(img)));
    
    // Give extra time for browser to fully render images with complex CSS
    // This is especially important for images with masks, clip-paths, etc.
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Convert all external images to inline data URLs to bypass CORS
    for (const img of images) {
      const originalSrcAttr = img.getAttribute("src");
      const originalSrcset = img.getAttribute("srcset");
      const originalSizes = img.getAttribute("sizes");
      const originalLoading = img.getAttribute("loading");
      const originalCrossOrigin = img.getAttribute("crossorigin");

      if (originalLoading !== "eager") {
        img.setAttribute("loading", "eager");
      }

      // For data URLs, just ensure they're decoded and don't modify them
      if (img.src.startsWith("data:")) {
        if ("decode" in img) {
          try {
            await img.decode();
          } catch (error) {
            console.warn("Failed to decode data URL image", error);
          }
        }
        // Don't add to replacements - we're not changing anything
        continue;
      }

      const absoluteUrl = toAbsoluteUrl(img.currentSrc || img.src);

      try {
        const dataUrl = await fetchImageAsDataUrl(absoluteUrl);

        imageReplacements.push({
          img,
          originalSrcAttr,
          originalSrcset,
          originalSizes,
          originalLoading,
          originalCrossOrigin,
        });

        img.removeAttribute("srcset");
        img.removeAttribute("sizes");
        img.src = dataUrl;
        if ("decode" in img) {
          try {
            await img.decode();
          } catch (decodeError) {
            console.warn(
              "Image decode failed after inlining, waiting for load event instead",
              decodeError,
            );
            await waitForImageReady(img);
          }
        } else {
          await waitForImageReady(img);
        }

        if (img.hasAttribute("crossorigin") && img.src.startsWith("data:")) {
          img.removeAttribute("crossorigin");
        }
      } catch (fetchError) {
        console.warn("Failed to inline image for export", fetchError);

        if (originalLoading === null) {
          img.removeAttribute("loading");
        } else {
          img.setAttribute("loading", originalLoading);
        }
      }
    }

    // Give browser time to update the images
    await new Promise((resolve) => setTimeout(resolve, 500));

    backgroundReplacements.push(...(await inlineCssBackgrounds(element)));
    
    // Force multiple reflows to ensure rendering
    void element.offsetHeight;
    await new Promise((resolve) => setTimeout(resolve, 100));
    void element.offsetWidth;
    
    // Extended wait to ensure all styles (especially masks/clips) are fully applied
    await new Promise((resolve) => setTimeout(resolve, 500));

    const pxW = element.scrollWidth;
    const pxH = element.scrollHeight;

    const linkAnnotations: Array<{
      href: string;
      rect: { x: number; y: number; width: number; height: number };
    }> = [];

    const elementRect = element.getBoundingClientRect();
    const anchors = Array.from(
      element.querySelectorAll<HTMLAnchorElement>("a[href]"),
    );

    for (const anchor of anchors) {
      const rawHref = anchor.getAttribute("href");

      if (!rawHref) {
        continue;
      }

      const normalizedHref = rawHref.trim();

      if (
        !normalizedHref ||
        normalizedHref.startsWith("#") ||
        normalizedHref.toLowerCase().startsWith("javascript:")
      ) {
        continue;
      }

      const href = anchor.href || normalizedHref;
      const rect = anchor.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) {
        continue;
      }

      linkAnnotations.push({
        href,
        rect: {
          x: rect.left - elementRect.left,
          y: rect.top - elementRect.top,
          width: rect.width,
          height: rect.height,
        },
      });
    }

    // Rasterize to PNG at 2x resolution for crisp output
    // Use skipFonts and filter to improve rendering reliability
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
      width: pxW,
      height: pxH,
      skipFonts: false,
      filter: () => {
        // Include all nodes
        return true;
      },
    });

    // Fetch the image data
    const imgArrayBuffer = await (await fetch(dataUrl)).arrayBuffer();

    // Convert px to points (72 DPI / 96 DPI = 0.75)
    const ptW = pxW * 0.75 * 2;
    const ptH = pxH * 0.75 * 2;

    // Create PDF with custom page size
    const pdfDoc = await PDFDocument.create();
    pdfDoc.setTitle(fileName);
    pdfDoc.setCreator("React/Vite + pdf-lib");
    pdfDoc.setProducer("pdf-lib");
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());

    const page = pdfDoc.addPage([ptW, ptH]);

    // Embed PNG and draw it
    const pngImage = await pdfDoc.embedPng(imgArrayBuffer);
    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: ptW,
      height: ptH,
    });

    if (linkAnnotations.length > 0) {
      const scaleX = ptW / pxW;
      const scaleY = ptH / pxH;
      let annots = page.node.Annots();

      if (!annots) {
        annots = pdfDoc.context.obj([]);
        page.node.set(PDFName.of("Annots"), annots);
      }

      const annotationsArray = annots!;

      for (const { href, rect } of linkAnnotations) {
        const width = rect.width * scaleX;
        const height = rect.height * scaleY;
        const x = rect.x * scaleX;
        const y = ptH - rect.y * scaleY - height;

        const annotation = pdfDoc.context.obj({
          Type: PDFName.of("Annot"),
          Subtype: PDFName.of("Link"),
          Rect: pdfDoc.context.obj([x, y, x + width, y + height]),
          Border: pdfDoc.context.obj([0, 0, 0]),
          A: pdfDoc.context.obj({
            Type: PDFName.of("Action"),
            S: PDFName.of("URI"),
            URI: PDFString.of(href),
          }),
        });

        annotationsArray.push(pdfDoc.context.register(annotation));
      }
    }

    // Save and download
    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength,
    );
    const blob = new Blob([pdfBuffer as ArrayBuffer], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  } finally {
    htmlRoot.classList.remove("cv-exporting");

    for (const {
      element: target,
      originalBackgroundImage,
    } of backgroundReplacements) {
      if (originalBackgroundImage) {
        target.style.backgroundImage = originalBackgroundImage;
      } else {
        target.style.removeProperty("background-image");
      }
    }

    for (const {
      img,
      originalSrcAttr,
      originalSrcset,
      originalSizes,
      originalLoading,
      originalCrossOrigin,
    } of imageReplacements) {
      if (originalSrcAttr !== null) {
        img.setAttribute("src", originalSrcAttr);
        if (img.src !== originalSrcAttr) {
          img.src = originalSrcAttr;
        }
      } else {
        img.removeAttribute("src");
      }

      if (originalSrcset !== null) {
        img.setAttribute("srcset", originalSrcset);
      } else {
        img.removeAttribute("srcset");
      }

      if (originalSizes !== null) {
        img.setAttribute("sizes", originalSizes);
      } else {
        img.removeAttribute("sizes");
      }

      if (originalLoading !== null) {
        img.setAttribute("loading", originalLoading);
      } else {
        img.removeAttribute("loading");
      }

      if (originalCrossOrigin !== null) {
        img.setAttribute("crossorigin", originalCrossOrigin);
      } else {
        img.removeAttribute("crossorigin");
      }
    }
  }
}

// Made with Bob
