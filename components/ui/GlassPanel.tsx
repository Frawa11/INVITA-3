import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export default function GlassPanel({ children, className, ...props }: GlassPanelProps) {
    return (
        <div
            className={cn(
                "bg-white/95 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
