import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Tag } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "informacoes", label: "Informações" },
  { id: "estrutura", label: "Estrutura e Perguntas" },
];

const categorias = [
  "Gerentes",
  "Vendas",
  "Financeiro",
  "Operações",
  "RH",
  "Qualidade",
];

export default function NovoChecklist() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("informacoes");
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    descricao: "",
  });

  return (
    <MainLayout>
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/checklists")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Novo Checklist
          </h1>
          <p className="text-sm text-muted-foreground">
            Crie um novo checklist de auditoria
          </p>
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
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "informacoes" && (
        <div className="bg-card rounded-lg shadow-card border border-border/50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome" className="flex items-center gap-1">
                Nome do Checklist <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="nome"
                  placeholder="Ex: Avaliação de Loja"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria (Setor)</Label>
              <Select
                value={formData.categoria}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoria: value })
                }
              >
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Selecione uma categoria" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Descreva o objetivo deste checklist..."
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              className="min-h-[120px] resize-none"
            />
          </div>

          <div className="flex justify-end mt-8">
            <Button onClick={() => setActiveTab("estrutura")}>
              Salvar Informações
            </Button>
          </div>
        </div>
      )}

      {activeTab === "estrutura" && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Configure a estrutura na página de edição do checklist</p>
          <Button 
            className="mt-4"
            onClick={() => navigate("/checklists/1/editar")}
          >
            Ir para Estrutura
          </Button>
        </div>
      )}
    </MainLayout>
  );
}
