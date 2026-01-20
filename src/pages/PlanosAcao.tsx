import { useState } from "react";
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  MapPin,
  User,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { StatusBadge } from "@/components/ui/status-badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlanoAcaoDialog } from "@/components/dialogs/PlanoAcaoDialog";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "todos", label: "Todos", count: 2 },
  { id: "abertos", label: "Abertos", count: 1 },
  { id: "em_andamento", label: "Em Andamento", count: 0 },
  { id: "resolvidos", label: "Resolvidos", count: 1 },
  { id: "verificados", label: "Verificados", count: 0 },
];

const planos = [
  {
    id: 1,
    titulo: "Manutenção de Queimadores (Chama Amarela)",
    ativo: "Forno Lastro Padaria",
    descricao: "Procedimento padrão para correção de chama amarela/instável.",
    status: "resolvido" as const,
    prioridade: "alta" as const,
    responsavel: "ADRIAN DA SILVA BROCHADO",
    causaRaiz: "Chama amarela indica combustão incompleta, gerando fuligem e alto consumo de gás.",
    localizacao: "Padaria - Área de Produção",
    procedimento: "1. Desligar alimentação de gás.\n2. Desmontar flauta.\n3. Limpar bicos injetores com agulha calibrada.\n4. Regular entrada de ar até obter chama azul.",
    prazo: "2026-01-20",
    custo: "R$ 150,00",
  },
  {
    id: 2,
    titulo: "Protocolo de Emergência - Quebra de Temperatura",
    ativo: "Câmara Fria Açougue",
    descricao: "Executar imediatamente ao detectar temperatura acima de -12°C na câmara.",
    status: "aberto" as const,
    prioridade: "critica" as const,
    responsavel: null,
    causaRaiz: "",
    localizacao: "",
    procedimento: "",
    prazo: "",
    custo: "",
  },
];

export default function PlanosAcao() {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState<typeof planos[0] | undefined>();

  const handleOpenPlano = (plano: typeof planos[0]) => {
    setSelectedPlano(plano);
    setDialogOpen(true);
  };

  const handleNewPlano = () => {
    setSelectedPlano(undefined);
    setDialogOpen(true);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Planos de Ação"
        description="Gerencie os planos de ação de auditorias e manutenções"
        action={{ label: "Novo Plano", onClick: handleNewPlano }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total de Planos"
          value={2}
          icon={<FileText className="h-5 w-5" />}
          variant="primary"
        />
        <StatCard
          label="Pendentes"
          value={1}
          icon={<Clock className="h-5 w-5" />}
          variant="warning"
        />
        <StatCard
          label="Atrasados"
          value={0}
          icon={<AlertTriangle className="h-5 w-5" />}
          variant="destructive"
        />
        <StatCard
          label="Concluídos"
          value={1}
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="success"
        />
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg shadow-card border border-border/50 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, ativo ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select defaultValue="todas">
            <SelectTrigger className="w-full md:w-[140px]">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="critica">Crítica</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="todos">
            <SelectTrigger className="w-full md:w-[140px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="responsavel1">Adrian</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input type="date" className="w-full md:w-auto" />
            <Input type="date" className="w-full md:w-auto" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            <span className={cn(
              "ml-1.5 text-xs",
              activeTab === tab.id ? "text-primary" : "text-muted-foreground"
            )}>
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {planos.map((plano) => (
          <button
            key={plano.id}
            onClick={() => handleOpenPlano(plano)}
            className={cn(
              "bg-card rounded-lg shadow-card border border-border/50 overflow-hidden transition-all hover:shadow-card-hover text-left",
              "border-t-4",
              plano.prioridade === "critica" ? "border-t-destructive" : 
              plano.prioridade === "alta" ? "border-t-warning" : "border-t-info"
            )}
          >
            <div className="p-5">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                {plano.titulo}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-primary mb-3">
                <MapPin className="h-3.5 w-3.5" />
                <span>{plano.ativo}</span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {plano.descricao}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <StatusBadge status={plano.status} />
                <StatusBadge status={plano.prioridade} />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span>{plano.responsavel || "Não definido"}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Dialog */}
      <PlanoAcaoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        plano={selectedPlano ? {
          id: selectedPlano.id,
          titulo: selectedPlano.titulo,
          ativo: selectedPlano.ativo,
          causaRaiz: selectedPlano.causaRaiz,
          localizacao: selectedPlano.localizacao,
          procedimento: selectedPlano.procedimento,
          responsavel: selectedPlano.responsavel || "",
          prazo: selectedPlano.prazo,
          custo: selectedPlano.custo,
          prioridade: selectedPlano.prioridade,
          status: selectedPlano.status,
        } : undefined}
      />
    </MainLayout>
  );
}
