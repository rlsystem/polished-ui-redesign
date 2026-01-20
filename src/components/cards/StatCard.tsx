import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
  className?: string;
}

const variantStyles = {
  default: "bg-card text-card-foreground",
  primary: "bg-card text-card-foreground",
  success: "bg-card text-card-foreground",
  warning: "bg-card text-card-foreground",
  destructive: "bg-card text-card-foreground",
};

const iconVariantStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

export function StatCard({ label, value, icon, trend, variant = "default", className }: StatCardProps) {
  return (
    <div
      className={cn(
        "p-5 rounded-lg shadow-card border border-border/50 transition-shadow hover:shadow-card-hover",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          {trend && (
            <p className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}% vs mês anterior
            </p>
          )}
        </div>
        {icon && (
          <div className={cn(
            "p-2.5 rounded-lg",
            iconVariantStyles[variant]
          )}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
