import { 
  ClipboardCheck, 
  Wrench, 
  Bell, 
  AlertTriangle,
  CheckCircle2,
  Users,
  Building2,
  Calendar
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { AIChatPanel } from "@/components/chat/AIChatPanel";

const recentActivities = [
  {
    id: 1,
    title: "Auditoria Açougue concluída",
    location: "GUAÍBA CENTRO",
    time: "há 2 horas",
    type: "auditoria",
    status: "concluido" as const,
  },
  {
    id: 2,
    title: "Manutenção preventiva agendada",
    description: "Ar Condicionado Split - Loja Centro",
    time: "há 3 horas",
    type: "manutencao",
    status: "agendada" as const,
  },
  {
    id: 3,
    title: "Novo aviso publicado",
    description: "Comunicado sobre procedimentos de segurança",
    time: "há 5 horas",
    type: "aviso",
    status: "ativo" as const,
  },
  {
    id: 4,
    title: "Plano de ação criado",
    description: "Correção de não conformidade - Padaria",
    time: "há 1 dia",
    type: "plano",
    status: "pendente" as const,
  },
];

const pendingAudits = [
  {
    id: 1,
    name: "Avaliação Açougue",
    location: "ARROIO DOS RATOS",
    date: "05/01/2026",
  },
  {
    id: 2,
    name: "Avaliação Padaria",
    location: "GUAÍBA CENTRO",
    date: "06/01/2026",
  },
  {
    id: 3,
    name: "Inspeção Frios",
    location: "CENTRO DISTRIBUIÇÃO",
    date: "07/01/2026",
  },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        description="Visão geral do sistema de gestão"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Auditorias Pendentes"
          value={12}
          icon={<ClipboardCheck className="h-5 w-5" />}
          variant="primary"
          trend={{ value: 8, isPositive: false }}
        />
        <StatCard
          label="Manutenções Agendadas"
          value={8}
          icon={<Wrench className="h-5 w-5" />}
          variant="warning"
        />
        <StatCard
          label="Planos de Ação Abertos"
          value={5}
          icon={<AlertTriangle className="h-5 w-5" />}
          variant="destructive"
        />
        <StatCard
          label="Avisos Ativos"
          value={3}
          icon={<Bell className="h-5 w-5" />}
          variant="success"
        />
      </div>

      {/* Content Grid with AI Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Chat Panel */}
        <div className="lg:col-span-2">
          <AIChatPanel />
        </div>

        {/* Pending Audits */}
        <div className="bg-card rounded-lg shadow-card border border-border/50">
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold text-foreground">Auditorias Pendentes</h2>
          </div>
          <div className="divide-y divide-border">
            {pendingAudits.map((audit) => (
              <div key={audit.id} className="p-4 hover:bg-muted/30 transition-colors">
                <p className="font-medium text-sm text-foreground mb-1">{audit.name}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {audit.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {audit.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <Button variant="ghost" className="w-full text-primary hover:text-primary">
              Ver todas
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-6 bg-card rounded-lg shadow-card border border-border/50">
        <div className="p-5 border-b border-border">
          <h2 className="font-semibold text-foreground">Atividades Recentes</h2>
        </div>
        <div className="divide-y divide-border">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm text-foreground truncate">
                      {activity.title}
                    </p>
                    <StatusBadge status={activity.status} />
                  </div>
                  {activity.description && (
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.description}
                    </p>
                  )}
                  {activity.location && (
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.location}
                    </p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full text-primary hover:text-primary">
            Ver todas as atividades
          </Button>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <StatCard
          label="Tarefas Concluídas Hoje"
          value={24}
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="success"
        />
        <StatCard
          label="Usuários Ativos"
          value={18}
          icon={<Users className="h-5 w-5" />}
          variant="primary"
        />
        <StatCard
          label="Filiais Cadastradas"
          value={6}
          icon={<Building2 className="h-5 w-5" />}
          variant="default"
        />
      </div>
    </MainLayout>
  );
}
