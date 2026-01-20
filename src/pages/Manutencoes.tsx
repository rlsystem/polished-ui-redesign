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
  Clock,
  ChevronRight,
  Eye,
  Edit,
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
    diasRestantes: 39,
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
    diasRestantes: 25,
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
    diasRestantes: 23,
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
    diasRestantes: null,
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
        <div className="flex flex-col lg:flex-row gap-4">
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
            <SelectTrigger className="w-full lg:w-[160px]">
              <SelectValue placeholder="Todos os Tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Tipos</SelectItem>
              <SelectItem value="preventiva">Preventiva</SelectItem>
              <SelectItem value="corretiva">Corretiva</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="todas">
            <SelectTrigger className="w-full lg:w-[160px]">
              <SelectValue placeholder="Todas as Filiais" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as Filiais</SelectItem>
              <SelectItem value="guaiba">GUAÍBA CENTRO</SelectItem>
              <SelectItem value="arroio">ARROIO DOS RATOS</SelectItem>
              <SelectItem value="cd">CENTRO DISTRIBUIÇÃO</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2 items-center">
            <Input type="date" className="w-full lg:w-[140px]" />
            <span className="text-muted-foreground text-sm shrink-0">até</span>
            <Input type="date" className="w-full lg:w-[140px]" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap",
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
          <div className="w-2.5 h-2.5 rounded-full bg-success" />
          <span className="text-muted-foreground">Preventiva</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-warning" />
          <span className="text-muted-foreground">Corretiva</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {manutencoes.map((item) => (
          <div
            key={item.id}
            className={cn(
              "bg-card rounded-xl shadow-card border border-border/50 overflow-hidden transition-all hover:shadow-card-hover group cursor-pointer",
              "border-l-4",
              item.tipo === "preventiva" ? "border-l-success" : "border-l-warning"
            )}
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">{item.titulo}</h3>
                <div className="flex gap-1.5 shrink-0">
                  <StatusBadge status={item.tipo} />
                  <StatusBadge status={item.status} />
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-sm text-primary">
                <Wrench className="h-3.5 w-3.5" />
                <span className="font-medium">{item.equipamento}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">{item.descricao}</p>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.local}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.data}
                </span>
              </div>

              {item.responsavel && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span>{item.responsavel}</span>
                </div>
              )}

              {item.custo && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>R$ {item.custo.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-muted/30 border-t border-border/50 flex items-center justify-between">
              {item.diasRestantes !== null ? (
                <div className="flex items-center gap-1.5 text-xs">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className={cn(
                    "font-medium",
                    item.diasRestantes <= 7 ? "text-warning" : "text-muted-foreground"
                  )}>
                    {item.diasRestantes} dias restantes
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span className="font-medium">Concluída</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                {item.status === "agendada" && (
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10">
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
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
