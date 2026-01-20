import { Calendar, Clock, MapPin, Eye, Edit, Trash2 } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

const agendamentos = [
  {
    id: 1,
    nome: "Checklist de Prevenção de Perdas e Manutenção",
    frequencia: "Uma vez",
    diasSemana: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    criarAs: "2026-01-19T08:00:00.000000Z",
    executarInicio: "2026-01-19T08:00:00.000000Z",
    executarFim: "2026-01-19T18:00:00.000000Z",
    filiais: "Todas as filiais",
    status: "ativo" as const,
  },
];

export default function Agendamentos() {
  return (
    <MainLayout>
      <PageHeader
        title="Agendamentos"
        description="Gerencie a criação automática de checklists"
        action={{ label: "Novo Agendamento", onClick: () => {} }}
      />

      <div className="space-y-4">
        {agendamentos.map((agendamento) => (
          <div
            key={agendamento.id}
            className="bg-card rounded-lg shadow-card border border-border/50 p-6 transition-shadow hover:shadow-card-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {agendamento.nome}
                  </h3>
                  <StatusBadge status={agendamento.status} />
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {agendamento.frequencia} • {agendamento.diasSemana.join(", ")}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Criar às {new Date(agendamento.criarAs).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Executar entre {new Date(agendamento.executarInicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - {new Date(agendamento.executarFim).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {agendamento.filiais}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9 text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {agendamentos.length === 0 && (
          <div className="bg-card rounded-lg shadow-card border border-border/50 p-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhum agendamento encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Crie um novo agendamento para automatizar a criação de checklists.
            </p>
            <Button>Criar Agendamento</Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
