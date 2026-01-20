import { cn } from "@/lib/utils";

interface OverviewItem {
  label: string;
  value: string | number;
}

interface OverviewBarProps {
  items: OverviewItem[];
  className?: string;
}

export function OverviewBar({ items, className }: OverviewBarProps) {
  return (
    <div className={cn(
      "rounded-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-card overflow-hidden",
      className
    )}>
      <div className="px-4 py-2 border-b border-white/10">
        <h3 className="font-semibold text-sm">Visão Geral</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
        {items.map((item, index) => (
          <div key={index} className="px-4 py-3 text-center">
            <p className="text-xs text-white/70 mb-1">{item.label}:</p>
            <p className="font-bold text-lg">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
