import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Search,
  MapPin,
  Edit,
  Trash2,
  Eye,
  Wrench,
  CheckCircle,
  AlertTriangle,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const patrimonios = [
  {
    id: 1,
    nome: "Empilhadeira Elétrica",
    codigo: "EMP-001",
    filial: "CENTRO DE DISTRIBUIÇÃO",
    setor: "Logística",
    status: "ativo" as const,
    ultimaManutencao: "15/01/2026",
  },
  {
    id: 2,
    nome: "Ar Condicionado Split 60000 BTUs",
    codigo: "AC-015",
    filial: "GUAÍBA CENTRO",
    setor: "Loja",
    status: "ativo" as const,
    ultimaManutencao: "10/01/2026",
  },
  {
    id: 3,
    nome: "Câmara Fria Açougue",
    codigo: "CF-003",
    filial: "GUAÍBA CENTRO",
    setor: "Açougue",
    status: "ativo" as const,
    ultimaManutencao: "05/01/2026",
  },
  {
    id: 4,
    nome: "Forno Lastro Padaria",
    codigo: "FRN-002",
    filial: "ARROIO DOS RATOS",
    setor: "Padaria",
    status: "em_andamento" as const,
    ultimaManutencao: "20/12/2025",
  },
  {
    id: 5,
    nome: "Freezer Horizontal 500L",
    codigo: "FRZ-008",
    filial: "ARROIO DOS RATOS",
    setor: "Frios",
    status: "inativo" as const,
    ultimaManutencao: "01/12/2025",
  },
];

export default function BensEquipamentos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <MainLayout>
      <PageHeader
        title="Bens & Equipamentos"
        description="Gerencie o patrimônio da empresa"
        action={{ label: "Novo Patrimônio", onClick: () => navigate("/bens-equipamentos/novo") }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total de Ativos"
          value={45}
          icon={<Package className="h-5 w-5" />}
          variant="primary"
        />
        <StatCard
          label="Ativos"
          value={38}
          icon={<CheckCircle className="h-5 w-5" />}
          variant="success"
        />
        <StatCard
          label="Em Manutenção"
          value={5}
          icon={<Wrench className="h-5 w-5" />}
          variant="warning"
        />
        <StatCard
          label="Inativos"
          value={2}
          icon={<AlertTriangle className="h-5 w-5" />}
          variant="destructive"
        />
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg shadow-card border border-border/50 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, código ou setor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
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
          <Select defaultValue="todos">
            <SelectTrigger className="w-full md:w-[160px]">
              <SelectValue placeholder="Todos os Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="manutencao">Em Manutenção</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg shadow-card border border-border/50">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Patrimônio</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Filial</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Última Manutenção</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patrimonios.map((item) => (
              <TableRow key={item.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{item.nome}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-sm">
                  {item.codigo}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.filial}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.setor}
                </TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.ultimaManutencao}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
}
