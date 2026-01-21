import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Play, Search, Filter, Trash2, X, AlertTriangle } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface Auditoria {
  id: number;
  nome: string;
  local: string;
  criadoEm: string;
  status: "em_andamento" | "pendente" | "concluido";
  checklist?: string;
}

const auditoriasIniciais: Auditoria[] = [
  {
    id: 1,
    nome: "Avaliação Açougue",
    local: "ARROIO DOS RATOS",
    criadoEm: "05/01/2026 às 12:36",
    status: "em_andamento",
    checklist: "Checklist Açougue",
  },
  {
    id: 2,
    nome: "Avaliação Açougue",
    local: "ARROIO DOS RATOS",
    criadoEm: "05/01/2026 às 12:36",
    status: "em_andamento",
    checklist: "Checklist Açougue",
  },
  {
    id: 3,
    nome: "Avaliação Padaria",
    local: "GUAÍBA CENTRO",
    criadoEm: "03/01/2026 às 02:32",
    status: "pendente",
    checklist: "Checklist Padaria",
  },
  {
    id: 4,
    nome: "Avaliação Hortifruti",
    local: "ARROIO DOS RATOS",
    criadoEm: "02/01/2026 às 21:16",
    status: "em_andamento",
    checklist: "Checklist Hortifruti",
  },
  {
    id: 5,
    nome: "Avaliação Frios",
    local: "ELDORADO DO SUL",
    criadoEm: "01/01/2026 às 10:00",
    status: "concluido",
    checklist: "Checklist Frios",
  },
];

const locais = ["Todos", "ARROIO DOS RATOS", "GUAÍBA CENTRO", "ELDORADO DO SUL"];
const statusOptions = [
  { value: "todos", label: "Todos os Status" },
  { value: "em_andamento", label: "Em Andamento" },
  { value: "pendente", label: "Pendente" },
  { value: "concluido", label: "Concluído" },
];

export default function Auditorias() {
  const navigate = useNavigate();
  const [auditorias, setAuditorias] = useState<Auditoria[]>(auditoriasIniciais);
  const [busca, setBusca] = useState("");
  const [localFiltro, setLocalFiltro] = useState("Todos");
  const [statusFiltro, setStatusFiltro] = useState("todos");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [auditoriaToDelete, setAuditoriaToDelete] = useState<Auditoria | null>(null);

  const handleExecutar = (auditoria: Auditoria) => {
    navigate(`/auditorias/${auditoria.id}/executar`);
  };

  const auditoriasFiltradas = auditorias.filter((auditoria) => {
    const matchBusca = auditoria.nome.toLowerCase().includes(busca.toLowerCase()) ||
      auditoria.local.toLowerCase().includes(busca.toLowerCase());
    const matchLocal = localFiltro === "Todos" || auditoria.local === localFiltro;
    const matchStatus = statusFiltro === "todos" || auditoria.status === statusFiltro;
    return matchBusca && matchLocal && matchStatus;
  });

  const handleDelete = (auditoria: Auditoria) => {
    setAuditoriaToDelete(auditoria);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (auditoriaToDelete) {
      setAuditorias(auditorias.filter(a => a.id !== auditoriaToDelete.id));
      setDeleteDialogOpen(false);
      setAuditoriaToDelete(null);
    }
  };

  const limparFiltros = () => {
    setBusca("");
    setLocalFiltro("Todos");
    setStatusFiltro("todos");
  };

  const temFiltrosAtivos = busca || localFiltro !== "Todos" || statusFiltro !== "todos";

  return (
    <MainLayout>
      <PageHeader
        title="Auditorias Pendentes"
        description="Execute as auditorias agendadas para o seu setor"
      />

      {/* Filtros */}
      <div className="bg-card rounded-xl border border-border/50 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Busca */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou local..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Local */}
          <Select value={localFiltro} onValueChange={setLocalFiltro}>
            <SelectTrigger className="w-full lg:w-[200px]">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Local" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-lg">
              {locais.map((local) => (
                <SelectItem key={local} value={local}>
                  {local}
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

          {/* Limpar Filtros */}
          {temFiltrosAtivos && (
            <Button variant="ghost" onClick={limparFiltros} className="gap-2">
              <X className="h-4 w-4" />
              Limpar
            </Button>
          )}
        </div>

        {/* Contador de resultados */}
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {auditoriasFiltradas.length} {auditoriasFiltradas.length === 1 ? "auditoria encontrada" : "auditorias encontradas"}
          </p>
        </div>
      </div>

      {/* Lista de Auditorias */}
      {auditoriasFiltradas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {auditoriasFiltradas.map((auditoria) => (
            <div
              key={auditoria.id}
              className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden transition-all hover:shadow-card-hover group"
            >
              <div className="p-5">
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

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 gap-2"
                    onClick={() => handleExecutar(auditoria)}
                  >
                    <Play className="h-4 w-4" />
                    {auditoria.status === "concluido" ? "Ver Resultado" : "Continuar"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(auditoria);
                    }}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border/50 p-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-foreground">Nenhuma auditoria encontrada</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Não encontramos auditorias com os filtros selecionados. Tente ajustar os critérios de busca.
            </p>
            {temFiltrosAtivos && (
              <Button variant="outline" onClick={limparFiltros} className="mt-2">
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <AlertDialogTitle>Excluir Auditoria</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir "{auditoriaToDelete?.nome}"?
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Esta ação não pode ser desfeita. Todos os dados e respostas desta auditoria serão permanentemente removidos.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir Auditoria
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
}
