import { useState } from "react";
import { Search, ListChecks, Edit, Copy, Trash2 } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const checklists = [
  {
    id: 1,
    nome: "Avaliação Açougue",
    descricao: "TESTE",
    categoria: "Gerentes",
    areas: 0,
    itens: 0,
  },
  {
    id: 2,
    nome: "Checklist de Prevenção de Perdas e Manutenção",
    descricao: "Auditoria focada em ativos críticos e qual...",
    categoria: "FINANCEIRO CONTAS A PAGAR",
    areas: 0,
    itens: 0,
  },
  {
    id: 3,
    nome: "Padaria Frios Embalados",
    descricao: "Checklist de produtos frios embalados da...",
    categoria: "Vendas",
    areas: 0,
    itens: 0,
  },
];

export default function Checklists() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <MainLayout>
      <PageHeader
        title="Modelos de Checklist"
        description="Gerencie seus modelos de auditoria"
        action={{ label: "Novo Checklist", onClick: () => {} }}
      />

      {/* Search */}
      <div className="bg-card rounded-lg shadow-card border border-border/50 p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar checklists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* List Card */}
      <div className="bg-card rounded-lg shadow-card border border-border/50">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Lista de Checklists</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {checklists.length} checklist(s) cadastrado(s)
              </p>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[400px]">Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-center">Áreas / Itens</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checklists.map((checklist) => (
              <TableRow key={checklist.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <ListChecks className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{checklist.nome}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {checklist.descricao}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {checklist.categoria}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="text-sm text-muted-foreground">
                    <span>{checklist.areas} área(s)</span>
                    <br />
                    <span>{checklist.itens} item(ns)</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Copy className="h-4 w-4" />
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
