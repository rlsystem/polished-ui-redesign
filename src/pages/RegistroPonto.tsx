import { useState } from "react";
import { 
  Search, 
  Filter, 
  X, 
  Clock, 
  LogIn, 
  LogOut, 
  User,
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

interface RegistroPonto {
  id: number;
  funcionario: string;
  cargo: string;
  filial: string;
  data: string;
  entrada?: string;
  saidaAlmoco?: string;
  voltaAlmoco?: string;
  saida?: string;
  horasTrabalhadas?: string;
  status: "presente" | "ausente" | "atrasado" | "incompleto";
}

const registros: RegistroPonto[] = [
  {
    id: 1,
    funcionario: "Rafael Silva",
    cargo: "Gerente de Loja",
    filial: "GUAÍBA CENTRO",
    data: "21/01/2026",
    entrada: "08:00",
    saidaAlmoco: "12:00",
    voltaAlmoco: "13:00",
    saida: "17:00",
    horasTrabalhadas: "8h 00min",
    status: "presente",
  },
  {
    id: 2,
    funcionario: "Maria Santos",
    cargo: "Operadora de Caixa",
    filial: "GUAÍBA CENTRO",
    data: "21/01/2026",
    entrada: "08:15",
    saidaAlmoco: "12:00",
    voltaAlmoco: "13:00",
    status: "incompleto",
  },
  {
    id: 3,
    funcionario: "João Pereira",
    cargo: "Açougueiro",
    filial: "ARROIO DOS RATOS",
    data: "21/01/2026",
    entrada: "08:32",
    saidaAlmoco: "12:00",
    voltaAlmoco: "13:00",
    saida: "17:00",
    horasTrabalhadas: "7h 28min",
    status: "atrasado",
  },
  {
    id: 4,
    funcionario: "Ana Costa",
    cargo: "Padeira",
    filial: "ARROIO DOS RATOS",
    data: "21/01/2026",
    status: "ausente",
  },
  {
    id: 5,
    funcionario: "Carlos Oliveira",
    cargo: "Repositor",
    filial: "ELDORADO DO SUL",
    data: "21/01/2026",
    entrada: "07:55",
    saidaAlmoco: "12:00",
    voltaAlmoco: "13:00",
    saida: "17:00",
    horasTrabalhadas: "8h 05min",
    status: "presente",
  },
  {
    id: 6,
    funcionario: "Fernanda Lima",
    cargo: "Supervisora",
    filial: "ELDORADO DO SUL",
    data: "21/01/2026",
    entrada: "08:00",
    saidaAlmoco: "12:15",
    voltaAlmoco: "13:15",
    saida: "17:00",
    horasTrabalhadas: "7h 45min",
    status: "presente",
  },
];

const filiais = ["Todas", "GUAÍBA CENTRO", "ARROIO DOS RATOS", "ELDORADO DO SUL"];
const statusOptions = [
  { value: "todos", label: "Todos os Status" },
  { value: "presente", label: "Presente" },
  { value: "ausente", label: "Ausente" },
  { value: "atrasado", label: "Atrasado" },
  { value: "incompleto", label: "Incompleto" },
];

export default function RegistroPontoPage() {
  const [busca, setBusca] = useState("");
  const [filialFiltro, setFilialFiltro] = useState("Todas");
  const [statusFiltro, setStatusFiltro] = useState("todos");
  const [dataFiltro, setDataFiltro] = useState("21/01/2026");

  const registrosFiltrados = registros.filter((registro) => {
    const matchBusca = 
      registro.funcionario.toLowerCase().includes(busca.toLowerCase()) ||
      registro.cargo.toLowerCase().includes(busca.toLowerCase());
    const matchFilial = filialFiltro === "Todas" || registro.filial === filialFiltro;
    const matchStatus = statusFiltro === "todos" || registro.status === statusFiltro;
    return matchBusca && matchFilial && matchStatus;
  });

  const limparFiltros = () => {
    setBusca("");
    setFilialFiltro("Todas");
    setStatusFiltro("todos");
  };

  const temFiltrosAtivos = busca || filialFiltro !== "Todas" || statusFiltro !== "todos";

  // Estatísticas
  const totalFuncionarios = registros.length;
  const presentes = registros.filter(r => r.status === "presente").length;
  const ausentes = registros.filter(r => r.status === "ausente").length;
  const atrasados = registros.filter(r => r.status === "atrasado").length;

  const getStatusColor = (status: RegistroPonto["status"]) => {
    switch (status) {
      case "presente":
        return "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10";
      case "ausente":
        return "text-red-600 bg-red-50 dark:bg-red-500/10";
      case "atrasado":
        return "text-amber-600 bg-amber-50 dark:bg-amber-500/10";
      case "incompleto":
        return "text-blue-600 bg-blue-50 dark:bg-blue-500/10";
    }
  };

  const getStatusLabel = (status: RegistroPonto["status"]) => {
    switch (status) {
      case "presente": return "Presente";
      case "ausente": return "Ausente";
      case "atrasado": return "Atrasado";
      case "incompleto": return "Incompleto";
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Registro de Ponto"
        description="Controle de entrada e saída dos funcionários"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalFuncionarios}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{presentes}</p>
              <p className="text-sm text-muted-foreground">Presentes</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{ausentes}</p>
              <p className="text-sm text-muted-foreground">Ausentes</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{atrasados}</p>
              <p className="text-sm text-muted-foreground">Atrasados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-card rounded-xl border border-border/50 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Busca */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou cargo..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filial */}
          <Select value={filialFiltro} onValueChange={setFilialFiltro}>
            <SelectTrigger className="w-full lg:w-[200px]">
              <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filial" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-lg">
              {filiais.map((filial) => (
                <SelectItem key={filial} value={filial}>
                  {filial}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={statusFiltro} onValueChange={setStatusFiltro}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-lg">
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Exportar */}
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>

          {/* Limpar Filtros */}
          {temFiltrosAtivos && (
            <Button variant="ghost" onClick={limparFiltros} className="gap-2">
              <X className="h-4 w-4" />
              Limpar
            </Button>
          )}
        </div>

        {/* Contador de resultados */}
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {registrosFiltrados.length} {registrosFiltrados.length === 1 ? "funcionário" : "funcionários"}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{dataFiltro}</span>
          </div>
        </div>
      </div>

      {/* Tabela de Registros */}
      <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Funcionário
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Filial
                </th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <LogIn className="h-3 w-3" />
                    Entrada
                  </div>
                </th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Saída Almoço
                </th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Volta Almoço
                </th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <LogOut className="h-3 w-3" />
                    Saída
                  </div>
                </th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Total
                </th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {registrosFiltrados.map((registro) => (
                <tr key={registro.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {registro.funcionario.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{registro.funcionario}</p>
                        <p className="text-sm text-muted-foreground">{registro.cargo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">{registro.filial}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={cn(
                      "text-sm font-mono",
                      registro.entrada ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {registro.entrada || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={cn(
                      "text-sm font-mono",
                      registro.saidaAlmoco ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {registro.saidaAlmoco || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={cn(
                      "text-sm font-mono",
                      registro.voltaAlmoco ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {registro.voltaAlmoco || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={cn(
                      "text-sm font-mono",
                      registro.saida ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {registro.saida || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={cn(
                      "text-sm font-semibold",
                      registro.horasTrabalhadas ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {registro.horasTrabalhadas || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={cn(
                      "inline-flex px-2.5 py-1 rounded-full text-xs font-medium",
                      getStatusColor(registro.status)
                    )}>
                      {getStatusLabel(registro.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {registrosFiltrados.length === 0 && (
          <div className="p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Nenhum registro encontrado</h3>
            <p className="text-sm text-muted-foreground">
              Tente ajustar os filtros de busca
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
