import type { MutableRefObject, ReactInstance } from 'react';

type PrintTarget = ReactInstance | HTMLElement | null;

declare module 'react-to-print' {
  interface UseReactToPrintOptions {
    content?: () => PrintTarget;
    contentRef?: MutableRefObject<HTMLElement | null>;
    documentTitle?: string;
    onBeforeGetContent?: () => void | Promise<void>;
    onAfterPrint?: () => void | Promise<void>;
    onBeforePrint?: () => void | Promise<void>;
    preserveAfterPrint?: boolean;
    removeAfterPrint?: boolean;
    bodyClass?: string;
  }

  type HandlePrint = () => void | Promise<void>;

  export function useReactToPrint(options: UseReactToPrintOptions): HandlePrint | undefined;
}
