import { useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  User,
  Eye,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Download,
  Filter,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const historico = [
  {
    id: 1,
    nome: "Avaliação Açougue",
    tipo: "Checklist Qualidade",
    local: "GUAÍBA CENTRO",
    auditor: "ADRIAN DA SILVA BROCHADO",
    dataInicio: "05/01/2026 às 09:15",
    dataFim: "05/01/2026 às 10:42",
    duracao: "1h 27min",
    pontuacao: 92,
    conformes: 46,
    naoConformes: 4,
    status: "concluido" as const,
  },
  {
    id: 2,
    nome: "Inspeção Padaria",
    tipo: "Checklist Higiene",
    local: "ARROIO DOS RATOS",
    auditor: "JOÃO PEREIRA",
    dataInicio: "04/01/2026 às 14:00",
    dataFim: "04/01/2026 às 15:30",
    duracao: "1h 30min",
    pontuacao: 78,
    conformes: 39,
    naoConformes: 11,
    status: "concluido" as const,
  },
  {
    id: 3,
    nome: "Avaliação Frios",
    tipo: "Checklist Temperatura",
    local: "CENTRO DISTRIBUIÇÃO",
    auditor: "MARIA SANTOS",
    dataInicio: "03/01/2026 às 08:00",
    dataFim: "03/01/2026 às 09:15",
    duracao: "1h 15min",
    pontuacao: 100,
    conformes: 25,
    naoConformes: 0,
    status: "concluido" as const,
  },
  {
    id: 4,
    nome: "Inspeção Hortifruti",
    tipo: "Checklist Qualidade",
    local: "GUAÍBA CENTRO",
    auditor: "ADRIAN DA SILVA BROCHADO",
    dataInicio: "02/01/2026 às 11:00",
    dataFim: "02/01/2026 às 12:20",
    duracao: "1h 20min",
    pontuacao: 85,
    conformes: 34,
    naoConformes: 6,
    status: "concluido" as const,
  },
  {
    id: 5,
    nome: "Avaliação Açougue",
    tipo: "Checklist Qualidade",
    local: "ARROIO DOS RATOS",
    auditor: "JOÃO PEREIRA",
    dataInicio: "01/01/2026 às 10:30",
    dataFim: null,
    duracao: null,
    pontuacao: null,
    conformes: 20,
    naoConformes: 2,
    status: "cancelado" as const,
  },
];

function getPontuacaoColor(pontuacao: number) {
  if (pontuacao >= 90) return "text-success";
  if (pontuacao >= 70) return "text-warning";
  return "text-destructive";
}

function getPontuacaoProgressColor(pontuacao: number) {
  if (pontuacao >= 90) return "bg-success";
  if (pontuacao >= 70) return "bg-warning";
  return "bg-destructive";
}

export default function HistoricoAuditorias() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [localFiltro, setLocalFiltro] = useState("todos");

  const totalAuditorias = historico.length;
  const concluidas = historico.filter(h => h.status === "concluido").length;
  const canceladas = historico.filter(h => h.status === "cancelado").length;
  const mediaScore = Math.round(
    historico.filter(h => h.pontuacao !== null).reduce((acc, h) => acc + (h.pontuacao || 0), 0) / 
    historico.filter(h => h.pontuacao !== null).length
  );

  return (
    <MainLayout>
      <PageHeader
        title="Histórico de Auditorias"
        description="Consulte o histórico completo das auditorias realizadas"
      >
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total de Auditorias"
          value={totalAuditorias}
          icon={<FileText className="h-5 w-5" />}
          variant="primary"
        />
        <StatCard
          label="Concluídas"
          value={concluidas}
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="success"
        />
        <StatCard
          label="Canceladas"
          value={canceladas}
          icon={<XCircle className="h-5 w-5" />}
          variant="destructive"
        />
        <StatCard
          label="Média de Pontuação"
          value={`${mediaScore}%`}
          icon={<FileText className="h-5 w-5" />}
          variant="default"
        />
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg shadow-card border border-border/50 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, auditor ou local..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Tipo de Checklist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Tipos</SelectItem>
              <SelectItem value="qualidade">Checklist Qualidade</SelectItem>
              <SelectItem value="higiene">Checklist Higiene</SelectItem>
              <SelectItem value="temperatura">Checklist Temperatura</SelectItem>
            </SelectContent>
          </Select>
          <Select value={localFiltro} onValueChange={setLocalFiltro}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Local" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Locais</SelectItem>
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

      {/* List */}
      <div className="space-y-3">
        {historico.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-lg shadow-card border border-border/50 p-5 transition-all hover:shadow-card-hover group cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Main Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-semibold text-foreground">{item.nome}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {item.tipo}
                  </span>
                  <StatusBadge status={item.status} />
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.local}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {item.auditor}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.dataInicio}
                  </span>
                  {item.duracao && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {item.duracao}
                    </span>
                  )}
                </div>
              </div>

              {/* Score */}
              {item.pontuacao !== null && (
                <div className="flex items-center gap-4 lg:min-w-[200px]">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Pontuação</span>
                      <span className={cn("text-sm font-semibold", getPontuacaoColor(item.pontuacao))}>
                        {item.pontuacao}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all", getPontuacaoProgressColor(item.pontuacao))}
                        style={{ width: `${item.pontuacao}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Conformity Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-medium">{item.conformes}</span>
                  <span className="text-muted-foreground">conformes</span>
                </div>
                <div className="flex items-center gap-1.5 text-destructive">
                  <XCircle className="h-4 w-4" />
                  <span className="font-medium">{item.naoConformes}</span>
                  <span className="text-muted-foreground">não conformes</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Eye className="h-4 w-4" />
                  Detalhes
                </Button>
                <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
