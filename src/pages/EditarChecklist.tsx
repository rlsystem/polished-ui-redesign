import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Plus,
  MoreVertical,
  MessageSquare,
  Paperclip,
  Zap,
  Link2,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

const tiposItem = [
  "Avaliativo (Conforme/NC)",
  "Sim/Não",
  "Texto Livre",
  "Numérico",
  "Data",
  "Seleção Múltipla",
];

interface ChecklistItem {
  id: number;
  pergunta: string;
  tipo: string;
  peso: number;
  obrigatorio: boolean;
  complementos: string[];
  ativo?: string;
}

interface Area {
  id: number;
  nome: string;
  descricao: string;
  isOpen: boolean;
  itens: ChecklistItem[];
}

const initialAreas: Area[] = [
  {
    id: 1,
    nome: "AÇOUGUE - ESTRUTURA",
    descricao: "Fale sobre o açougue",
    isOpen: true,
    itens: [
      {
        id: 1,
        pergunta: "Limpeza e organização do açougues",
        tipo: "Avaliativo (Conforme/NC)",
        peso: 1,
        obrigatorio: false,
        complementos: ["Comentário", "Anexos"],
      },
      {
        id: 2,
        pergunta: "Validades e procedências conforme solicitação da vigilâncias",
        tipo: "Avaliativo (Conforme/NC)",
        peso: 1,
        obrigatorio: true,
        complementos: ["Plano de Ação"],
      },
    ],
  },
];

export default function EditarChecklist() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("estrutura");
  const [areas, setAreas] = useState<Area[]>(initialAreas);
  const [editingItem, setEditingItem] = useState<number | null>(1);

  const toggleArea = (areaId: number) => {
    setAreas(areas.map(area => 
      area.id === areaId ? { ...area, isOpen: !area.isOpen } : area
    ));
  };

  const updateItem = (areaId: number, itemId: number, updates: Partial<ChecklistItem>) => {
    setAreas(areas.map(area => 
      area.id === areaId 
        ? {
            ...area,
            itens: area.itens.map(item => 
              item.id === itemId ? { ...item, ...updates } : item
            )
          }
        : area
    ));
  };

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
            Editar Checklist
          </h1>
          <p className="text-sm text-muted-foreground">
            Atualize as informações e a estrutura do checklist
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
      {activeTab === "estrutura" && (
        <div className="space-y-4">
          {areas.map((area) => (
            <div
              key={area.id}
              className="bg-card rounded-lg shadow-card border-2 border-primary/20 overflow-hidden"
            >
              {/* Area Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <button
                  onClick={() => toggleArea(area.id)}
                  className="flex items-center gap-3 text-left"
                >
                  {area.isOpen ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className="font-semibold text-foreground">{area.nome}</span>
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {area.itens.length} itens
                  </span>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Plus className="h-4 w-4" />
                    Novo Item
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Area Content */}
              {area.isOpen && (
                <div className="p-6">
                  {/* Area Info */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {area.nome}
                    </h3>
                    <p className="text-sm text-muted-foreground">{area.descricao}</p>
                  </div>

                  {/* Items */}
                  <div className="space-y-4">
                    {area.itens.map((item, index) => (
                      <div
                        key={item.id}
                        className={cn(
                          "border border-border rounded-lg transition-all",
                          editingItem === item.id ? "border-primary bg-card shadow-md" : "bg-muted/20"
                        )}
                      >
                        {editingItem === item.id ? (
                          <div className="p-5 space-y-5">
                            {/* Pergunta */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                  Pergunta do Item
                                </Label>
                                <span className="text-xs text-muted-foreground">
                                  {item.pergunta.length}/1000
                                </span>
                              </div>
                              <Input
                                value={item.pergunta}
                                onChange={(e) =>
                                  updateItem(area.id, item.id, { pergunta: e.target.value })
                                }
                                className="text-base"
                              />
                            </div>

                            {/* Tipo e Peso */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                  Tipo
                                </Label>
                                <Select
                                  value={item.tipo}
                                  onValueChange={(value) =>
                                    updateItem(area.id, item.id, { tipo: value })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {tiposItem.map((tipo) => (
                                      <SelectItem key={tipo} value={tipo}>
                                        {tipo}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                  Peso*
                                </Label>
                                <Input
                                  type="number"
                                  min={1}
                                  value={item.peso}
                                  onChange={(e) =>
                                    updateItem(area.id, item.id, { peso: parseInt(e.target.value) || 1 })
                                  }
                                />
                              </div>
                            </div>

                            {/* Complementos */}
                            <div className="space-y-2">
                              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Complementos
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  variant={item.complementos.includes("Comentário") ? "secondary" : "outline"}
                                  size="sm"
                                  className="gap-1.5"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  Comentário
                                </Button>
                                <Button
                                  variant={item.complementos.includes("Anexos") ? "secondary" : "outline"}
                                  size="sm"
                                  className="gap-1.5"
                                >
                                  <Paperclip className="h-4 w-4" />
                                  Anexos
                                </Button>
                                <Button
                                  variant={item.complementos.includes("Plano de Ação") ? "secondary" : "outline"}
                                  size="sm"
                                  className="gap-1.5"
                                >
                                  <Zap className="h-4 w-4" />
                                  Plano de Ação
                                </Button>
                              </div>
                            </div>

                            {/* Vincular Ativo */}
                            <div className="space-y-2">
                              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                                <Link2 className="h-3.5 w-3.5" />
                                Vincular Ativo
                              </Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um ativo..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="empilhadeira">Empilhadeira Elétrica</SelectItem>
                                  <SelectItem value="ar">Ar Condicionado Split</SelectItem>
                                  <SelectItem value="camara">Câmara Fria Açougue</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-xs text-muted-foreground">
                                Se selecionado, o Plano de Ação já virá preenchido com este ativo.
                              </p>
                            </div>

                            {/* Obrigatório + Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-border">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Obrigatório</span>
                                <Switch
                                  checked={item.obrigatorio}
                                  onCheckedChange={(checked) =>
                                    updateItem(area.id, item.id, { obrigatorio: checked })
                                  }
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" onClick={() => setEditingItem(null)}>
                                  Cancelar
                                </Button>
                                <Button onClick={() => setEditingItem(null)}>
                                  Salvar
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingItem(item.id)}
                            className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <span className="flex items-center justify-center h-6 w-6 rounded bg-muted text-xs font-medium text-muted-foreground">
                                {index + 1}
                              </span>
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{item.pergunta}</p>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  Peso {item.peso}
                                </p>
                              </div>
                            </div>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Area Button */}
          <Button variant="outline" className="w-full gap-2 py-6 border-dashed">
            <Plus className="h-5 w-5" />
            Adicionar Nova Área
          </Button>
        </div>
      )}

      {activeTab === "informacoes" && (
        <div className="bg-card rounded-lg shadow-card border border-border/50 p-6">
          <p className="text-muted-foreground">Editar informações básicas do checklist</p>
        </div>
      )}
    </MainLayout>
  );
}
