# Digital CV - Daniel Barber

A modern, interactive digital CV built with React, TypeScript, and Tailwind CSS. Features a clean design with PDF export functionality.

## 🚀 Features

- **Modern Design**: Clean, professional layout optimized for readability
- **PDF Export**: Download your CV as a PDF with clickable links preserved
- **Responsive**: Works seamlessly on desktop and mobile devices
- **Fast**: Built with Vite for lightning-fast development and builds
- **Type-Safe**: Written in TypeScript for better code quality

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **html-to-image** - PDF generation
- **pdf-lib** - PDF manipulation with clickable links

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 🏗️ Project Structure

```
digital-cv/
├── components/           # React components
│   ├── CVHeader.tsx     # Header with profile info
│   ├── CVSection.tsx    # Section wrapper
│   ├── ExperienceItem.tsx
│   ├── EducationItem.tsx
│   ├── SkillCategory.tsx
│   ├── LanguageItem.tsx
│   ├── VolunteerItem.tsx
│   ├── ImageWithFallback.tsx  # Image component with fallback
│   ├── types.ts         # Shared TypeScript types
│   └── ui/              # UI components
│       ├── button.tsx
│       ├── buttonVariants.ts
│       └── utils.ts
├── src/
│   ├── App.tsx          # Main application
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│   ├── data/
│   │   └── cvData.ts    # CV content data
│   ├── utils/
│   │   └── pdfExport.ts # PDF generation utilities
│   └── assets/          # Images and assets
├── public/              # Static files
└── index.html           # HTML template
```

## 🎨 Customization

### Update CV Data

Edit the `cvData` object in `src/data/cvData.ts` to customize:
- Profile information
- Work experience
- Education
- Skills
- Languages
- Volunteer work

### Styling

The project uses Tailwind CSS v4. Modify styles in:
- `src/index.css` - Global styles and Tailwind configuration
- Component files - Component-specific styles

### Skill Categories

Skill category colors are defined in `components/SkillCategory.tsx`:
```typescript
const categoryStyles: Record<string, string> = {
  "Professional & Personal": "bg-gradient-to-r from-blue-500 to-cyan-500",
  "Technical Skills": "bg-gradient-to-r from-purple-500 to-pink-500",
  "Software & Prototyping": "bg-gradient-to-r from-green-500 to-cyan-500",
  "Design & Process": "bg-gradient-to-r from-orange-500 to-red-500",
};
```

## 📄 PDF Export

The PDF export feature:
- Converts the CV to a high-resolution PNG (2x pixel ratio)
- Embeds the image in a PDF document
- Preserves clickable links (email, LinkedIn, website)
- Handles CORS issues with external images via proxy
- Maintains proper page dimensions

## 🚀 Deployment

This project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

The site will be deployed to: `https://[username].github.io/digital-cv/`

## 📝 License

This project is open source and available for personal use.

## 👤 Author

**Daniel Barber**
- LinkedIn: [daniel-robert-barber](https://www.linkedin.com/in/daniel-robert-barber/)
- Website: [daniel-barber.github.io/digital-cv](https://daniel-barber.github.io/digital-cv/)

---

Built with ❤️ using React and Tailwind CSS
