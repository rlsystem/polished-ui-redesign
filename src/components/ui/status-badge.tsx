import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "ativo" | "inativo" | "pendente" | "em_andamento" | "concluido" | "cancelado" | "agendada" | "preventiva" | "corretiva" | "aberto" | "resolvido" | "critica" | "alta" | "media" | "baixa";
  className?: string;
}

const statusConfig: Record<StatusBadgeProps["status"], { label: string; className: string }> = {
  ativo: { label: "Ativo", className: "bg-success/10 text-success border-success/20" },
  inativo: { label: "Inativo", className: "bg-muted text-muted-foreground border-muted" },
  pendente: { label: "Pendente", className: "bg-warning/10 text-warning border-warning/20" },
  em_andamento: { label: "Em Andamento", className: "bg-info/10 text-info border-info/20" },
  concluido: { label: "Concluído", className: "bg-success/10 text-success border-success/20" },
  cancelado: { label: "Cancelado", className: "bg-muted text-muted-foreground border-muted" },
  agendada: { label: "Agendada", className: "bg-info/10 text-info border-info/20" },
  preventiva: { label: "Preventiva", className: "bg-success/10 text-success border-success/20" },
  corretiva: { label: "Corretiva", className: "bg-warning/10 text-warning border-warning/20" },
  aberto: { label: "Aberto", className: "bg-warning/10 text-warning border-warning/20" },
  resolvido: { label: "Resolvido", className: "bg-success/10 text-success border-success/20" },
  critica: { label: "Crítica", className: "bg-destructive/10 text-destructive border-destructive/20" },
  alta: { label: "Alta", className: "bg-warning/10 text-warning border-warning/20" },
  media: { label: "Média", className: "bg-info/10 text-info border-info/20" },
  baixa: { label: "Baixa", className: "bg-muted text-muted-foreground border-muted" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
