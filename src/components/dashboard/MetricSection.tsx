import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricItem {
  label: string;
  value: string | number;
  highlight?: boolean;
}

interface MetricSectionProps {
  title: string;
  icon?: ReactNode;
  iconBgColor?: string;
  metrics: MetricItem[];
  children?: ReactNode;
  className?: string;
  variant?: "default" | "gradient-blue" | "gradient-dark";
}

export function MetricSection({ 
  title, 
  icon, 
  iconBgColor = "bg-primary/10",
  metrics, 
  children,
  className,
  variant = "default"
}: MetricSectionProps) {
  const variantStyles = {
    default: "bg-card border-border/50",
    "gradient-blue": "bg-gradient-to-r from-primary to-primary/80 border-transparent",
    "gradient-dark": "bg-gradient-to-r from-sidebar-background to-sidebar-accent border-transparent"
  };

  const isGradient = variant !== "default";

  return (
    <div className={cn(
      "rounded-lg shadow-card border overflow-hidden",
      variantStyles[variant],
      className
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 border-b",
        isGradient ? "border-white/10" : "border-border/50 bg-muted/30"
      )}>
        {icon && (
          <div className={cn(
            "w-7 h-7 rounded-md flex items-center justify-center",
            isGradient ? "bg-white/20" : iconBgColor
          )}>
            {icon}
          </div>
        )}
        <h3 className={cn(
          "font-semibold text-sm",
          isGradient ? "text-white" : "text-foreground"
        )}>
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className={cn(
                "text-sm",
                isGradient ? "text-white/80" : "text-muted-foreground"
              )}>
                {metric.label}:
              </span>
              <span className={cn(
                "font-semibold text-sm",
                metric.highlight 
                  ? "text-success" 
                  : (isGradient ? "text-white" : "text-foreground")
              )}>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
