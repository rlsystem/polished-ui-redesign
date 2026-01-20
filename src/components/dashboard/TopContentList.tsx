import { cn } from "@/lib/utils";

interface TopContentListProps {
  title: string;
  items: string[];
  className?: string;
  isGradient?: boolean;
}

export function TopContentList({ title, items, className, isGradient = false }: TopContentListProps) {
  return (
    <div className={cn(
      "mt-3 pt-3 border-t",
      isGradient ? "border-white/20" : "border-border/50",
      className
    )}>
      <p className={cn(
        "text-xs font-semibold mb-2 px-2 py-1 rounded inline-block",
        isGradient ? "text-white bg-white/20" : "text-primary bg-primary/10"
      )}>
        {title}:
      </p>
      <ul className="space-y-1 mt-2">
        {items.map((item, index) => (
          <li key={index} className={cn(
            "text-sm flex items-center gap-2",
            isGradient ? "text-white/80" : "text-muted-foreground"
          )}>
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              isGradient ? "bg-white/60" : "bg-primary"
            )} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
