import { useState } from "react";
import {
  Bell,
  Search,
  Calendar,
  Eye,
  CheckCircle2,
  BarChart3,
  Edit,
  Trash2,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const avisos = [
  {
    id: 1,
    titulo: "Seja Bem Vinda Jenifer",
    exibicao: "07/01/2026 às 14:21",
    criado: "07/01/2026 às 14:24",
    visualizacoes: 0,
    confirmacoes: 0,
    setor: "RH",
    status: "ativo" as const,
  },
  {
    id: 2,
    titulo: "GRATIDÃO",
    exibicao: "06/01/2026 às 15:36",
    criado: "06/01/2026 às 15:37",
    visualizacoes: 0,
    confirmacoes: 0,
    setor: "RH",
    status: "ativo" as const,
  },
  {
    id: 3,
    titulo: "DIA DE VENDER",
    exibicao: "05/01/2026 às 08:00",
    criado: "05/01/2026 às 07:45",
    visualizacoes: 45,
    confirmacoes: 38,
    setor: "Vendas",
    status: "ativo" as const,
  },
];

export default function Avisos() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <MainLayout>
      <PageHeader
        title="Gerenciamento de Avisos"
        description="Administre os comunicados da empresa"
        action={{ label: "Novo Aviso", onClick: () => {} }}
      />

      {/* Filters */}
      <div className="bg-card rounded-lg shadow-card border border-border/50 p-5 mb-6">
        <h3 className="font-medium text-foreground mb-4">Lista de Avisos</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {avisos.length} aviso(s) cadastrado(s)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select defaultValue="todos">
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" placeholder="Data Início (De)" />
          <Input type="date" placeholder="Data Início (Até)" />
          <Button className="gap-2">
            <Search className="h-4 w-4" />
            Aplicar
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {avisos.map((aviso) => (
          <div
            key={aviso.id}
            className="bg-card rounded-lg shadow-card border border-border/50 p-5 transition-shadow hover:shadow-card-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-foreground">{aviso.titulo}</h3>
                  <StatusBadge status={aviso.status} />
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Exibição: {aviso.exibicao}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Criado: {aviso.criado}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    {aviso.visualizacoes} visualizações
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {aviso.confirmacoes} confirmações
                  </span>
                </div>

                <Badge variant="secondary" className="mt-3">
                  {aviso.setor}
                </Badge>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <BarChart3 className="h-4 w-4" />
                  Relatório
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
