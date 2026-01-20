import { useState } from "react";
import {
  Wrench,
  Calendar,
  AlertTriangle,
  DollarSign,
  Search,
  MapPin,
  User,
  CheckCircle2,
  Trash2,
  Filter,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "todas", label: "Todas", count: 5 },
  { id: "agendadas", label: "Agendadas", count: 3 },
  { id: "em_andamento", label: "Em Andamento", count: 0 },
  { id: "concluidas", label: "Concluídas", count: 2 },
  { id: "canceladas", label: "Canceladas", count: 0 },
];

const manutencoes = [
  {
    id: 1,
    titulo: "Revisão completa empilhadeira",
    equipamento: "Empilhadeira Elétrica",
    local: "CENTRO DE DISTRIBUIÇÃO",
    data: "28/02/2026",
    custo: null,
    tipo: "preventiva" as const,
    status: "agendada" as const,
    descricao: "Troca de óleo, verificação de bateria, freios e sistemas de segurança",
    responsavel: null,
  },
  {
    id: 2,
    titulo: "Limpeza de filtros e verificação de gás",
    equipamento: "Ar Condicionado Split 60000 BTUs",
    local: "GUAÍBA CENTRO",
    data: "14/02/2026",
    custo: null,
    tipo: "preventiva" as const,
    status: "agendada" as const,
    descricao: "Limpeza completa dos filtros, verificação de pressão do gás refrigerante",
    responsavel: null,
  },
  {
    id: 3,
    titulo: "Verificação de temperatura e vedação",
    equipamento: "Câmara Fria Açougue",
    local: "GUAÍBA CENTRO",
    data: "12/02/2026",
    custo: null,
    tipo: "preventiva" as const,
    status: "agendada" as const,
    descricao: "Checar termostato, borrachas de vedação e limpeza do condensador",
    responsavel: "ADRIAN DA SILVA BROCHADO",
  },
  {
    id: 4,
    titulo: "Trocar compressor",
    equipamento: "Freezer Horizontal 500L",
    local: "ARROIO DOS RATOS",
    data: "10/02/2026",
    custo: 1250.00,
    tipo: "corretiva" as const,
    status: "concluido" as const,
    descricao: "Substituição do compressor danificado",
    responsavel: "JOÃO PEREIRA",
  },
];

export default function Manutencoes() {
  const [activeTab, setActiveTab] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <MainLayout>
      <PageHeader
        title="Manutenções"
        description="Gerencie as manutenções preventivas e corretivas dos patrimônios"
        action={{ label: "Nova Manutenção", onClick: () => {} }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total"
          value={5}
          icon={<Wrench className="h-5 w-5" />}
          variant="primary"
        />
        <StatCard
          label="Preventivas"
          value={3}
          icon={<Calendar className="h-5 w-5" />}
          variant="success"
        />
        <StatCard
          label="Corretivas"
          value={2}
          icon={<AlertTriangle className="h-5 w-5" />}
          variant="warning"
        />
        <StatCard
          label="Custo Total"
          value="R$ 1.250,00"
          icon={<DollarSign className="h-5 w-5" />}
          variant="default"
        />
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg shadow-card border border-border/50 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, patrimônio ou técnico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select defaultValue="todos">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Todos os Tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Tipos</SelectItem>
              <SelectItem value="preventiva">Preventiva</SelectItem>
              <SelectItem value="corretiva">Corretiva</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="todas">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Todas as Filiais" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as Filiais</SelectItem>
              <SelectItem value="guaiba">GUAÍBA CENTRO</SelectItem>
              <SelectItem value="arroio">ARROIO DOS RATOS</SelectItem>
              <SelectItem value="cd">CENTRO DISTRIBUIÇÃO</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input type="date" className="w-full md:w-auto" placeholder="dd/mm/aaaa" />
            <span className="flex items-center text-muted-foreground text-sm">até</span>
            <Input type="date" className="w-full md:w-auto" placeholder="dd/mm/aaaa" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-border">
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

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <span className="text-muted-foreground">Legenda:</span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-muted-foreground">Preventiva</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-warning" />
          <span className="text-muted-foreground">Corretiva</span>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {manutencoes.map((item) => (
          <div
            key={item.id}
            className={cn(
              "bg-card rounded-lg shadow-card border border-border/50 p-4 transition-shadow hover:shadow-card-hover",
              "border-l-4",
              item.tipo === "preventiva" ? "border-l-success" : "border-l-warning"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-medium text-foreground">{item.titulo}</h3>
                  <StatusBadge status={item.tipo} />
                  <StatusBadge status={item.status} />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Wrench className="h-3.5 w-3.5" />
                    {item.equipamento}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.local}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.data}
                  </span>
                  {item.custo && (
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5" />
                      R$ {item.custo.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  {item.responsavel && (
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {item.responsavel}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">{item.descricao}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.status === "agendada" && (
                  <Button variant="outline" size="sm" className="gap-1.5 text-success border-success/30 hover:bg-success/10 hover:text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    Concluir
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
