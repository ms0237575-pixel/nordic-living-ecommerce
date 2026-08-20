import React, { createContext, useContext, useEffect, useId } from "react";
import { X } from "lucide-react";

type SheetContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const SheetContext = createContext<SheetContextValue | null>(null);

type SheetProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: React.ReactNode;
};

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <SheetContext.Provider value={{ open, setOpen: onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children }: { children: React.ReactNode }) {
  const ctx = useContext(SheetContext);
  if (!ctx) return <>{children}</>;
  return (
    <div
      onClick={() => ctx.setOpen(true)}
      aria-controls={"sheet-content-" + useId()}
    >
      {children}
    </div>
  );
}

export function SheetContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(SheetContext);

  useEffect(() => {
    if (!ctx?.open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [ctx?.open, ctx]);

  if (!ctx) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-nordic-charcoal/40 backdrop-blur-sm transition-opacity ${
          ctx.open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => ctx.setOpen(false)}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-80 bg-nordic-bg p-6 pt-16 shadow-xl transition-transform duration-300 ${ctx.open ? "translate-x-0" : "-translate-x-full"} ${className ?? ""}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => ctx.setOpen(false)}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center p-2 text-nordic-charcoal transition-colors hover:text-nordic-terracotta"
        >
          <X className="size-5 stroke-[1.5]" />
        </button>
        <div className="h-full overflow-auto">{children}</div>
      </aside>
    </>
  );
}

export default Sheet;
