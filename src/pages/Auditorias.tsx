import { MapPin, Clock, Play } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

const auditorias = [
  {
    id: 1,
    nome: "Avaliação Açougue",
    local: "ARROIO DOS RATOS",
    criadoEm: "05/01/2026 às 12:36",
    status: "em_andamento" as const,
  },
  {
    id: 2,
    nome: "Avaliação Açougue",
    local: "ARROIO DOS RATOS",
    criadoEm: "05/01/2026 às 12:36",
    status: "em_andamento" as const,
  },
  {
    id: 3,
    nome: "Avaliação Açougue",
    local: "GUAÍBA CENTRO",
    criadoEm: "03/01/2026 às 02:32",
    status: "em_andamento" as const,
  },
  {
    id: 4,
    nome: "Avaliação Açougue",
    local: "ARROIO DOS RATOS",
    criadoEm: "02/01/2026 às 21:16",
    status: "em_andamento" as const,
  },
];

export default function Auditorias() {
  return (
    <MainLayout>
      <PageHeader
        title="Auditorias Pendentes"
        description="Execute as auditorias agendadas para o seu setor"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {auditorias.map((auditoria) => (
          <div
            key={auditoria.id}
            className="bg-card rounded-lg shadow-card border border-border/50 p-5 transition-all hover:shadow-card-hover group"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="font-semibold text-foreground">{auditoria.nome}</h3>
              <StatusBadge status={auditoria.status} />
            </div>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{auditoria.local}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Criada em {auditoria.criadoEm}</span>
              </div>
            </div>

            <Button className="w-full gap-2">
              <Play className="h-4 w-4" />
              Continuar Auditoria
            </Button>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
