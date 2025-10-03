import { type ReactNode, useEffect, useRef } from "react";

interface DialogProps {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
}

export default function Dialog({
    open,
    title,
    children,
    onClose,
}: DialogProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            ref={overlayRef}
            className="dialog-overlay"
            onMouseDown={(e) => {
                if (e.target === overlayRef.current) onClose();
            }}
        >
            <div className="dialog-content">
                <h1 id="dialog-title">{title}</h1>
                {children}
            </div>
        </div>
    );
}
