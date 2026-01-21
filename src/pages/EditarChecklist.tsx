import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Plus,
  MoreVertical,
  MessageSquare,
  Camera,
  Zap,
  Link2,
  Layers,
  GripVertical,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  { value: "avaliativo", label: "Avaliativo (Conforme/Não Conforme)" },
  { value: "sim_nao", label: "Sim/Não" },
  { value: "texto", label: "Texto Livre" },
  { value: "numerico", label: "Numérico" },
  { value: "data", label: "Data" },
  { value: "selecao", label: "Seleção Múltipla" },
];

interface ChecklistItem {
  id: number;
  pergunta: string;
  tipo: string;
  peso: number;
  obrigatorio: boolean;
  comentario: boolean;
  foto: boolean;
  planoAcao: boolean;
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
        tipo: "avaliativo",
        peso: 1,
        obrigatorio: true,
        comentario: true,
        foto: true,
        planoAcao: true,
      },
      {
        id: 2,
        pergunta: "Validades e procedências conforme solicitação da vigilâncias",
        tipo: "avaliativo",
        peso: 1,
        obrigatorio: true,
        comentario: false,
        foto: true,
        planoAcao: true,
      },
      {
        id: 3,
        pergunta: "Equipamentos de proteção individual em uso",
        tipo: "sim_nao",
        peso: 2,
        obrigatorio: false,
        comentario: true,
        foto: false,
        planoAcao: false,
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

  const toggleComplement = (areaId: number, itemId: number, field: 'comentario' | 'foto' | 'planoAcao') => {
    const area = areas.find(a => a.id === areaId);
    const item = area?.itens.find(i => i.id === itemId);
    if (item) {
      updateItem(areaId, itemId, { [field]: !item[field] });
    }
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
              className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden"
            >
              {/* Area Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
                <button
                  onClick={() => toggleArea(area.id)}
                  className="flex items-center gap-3 text-left"
                >
                  {area.isOpen ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                  <Layers className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">{area.nome}</span>
                  <span className="ml-2 px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                    {area.itens.length} itens
                  </span>
                </button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-1.5 text-primary hover:text-primary hover:bg-primary/10">
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
                <div className="p-5 space-y-3">
                  {area.itens.map((item, index) => (
                    <div
                      key={item.id}
                      className={cn(
                        "rounded-xl transition-all overflow-hidden",
                        editingItem === item.id 
                          ? "border-2 border-primary bg-card shadow-lg" 
                          : "border border-border/60 bg-muted/20 hover:bg-muted/40"
                      )}
                    >
                      {editingItem === item.id ? (
                        <div className="p-6">
                          {/* Pergunta Section */}
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs font-semibold text-primary uppercase tracking-wider">
                                Pergunta
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
                              className="text-base h-12 border-2 border-primary/30 focus:border-primary bg-background"
                              placeholder="Digite a pergunta do item..."
                            />
                          </div>

                          {/* Tipo e Peso */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            <div className="space-y-2.5">
                              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Tipo de Resposta
                              </Label>
                              <Select
                                value={item.tipo}
                                onValueChange={(value) =>
                                  updateItem(area.id, item.id, { tipo: value })
                                }
                              >
                                <SelectTrigger className="h-12 bg-muted/50">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-popover border border-border shadow-lg">
                                  {tiposItem.map((tipo) => (
                                    <SelectItem key={tipo.value} value={tipo.value}>
                                      {tipo.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2.5">
                              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Peso na Pontuação
                              </Label>
                              <Input
                                type="number"
                                min={1}
                                max={10}
                                value={item.peso}
                                onChange={(e) =>
                                  updateItem(area.id, item.id, { peso: parseInt(e.target.value) || 1 })
                                }
                                className="h-12 bg-muted/50"
                              />
                            </div>
                          </div>

                          {/* Complementos - Card Style */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            <button
                              onClick={() => toggleComplement(area.id, item.id, 'comentario')}
                              className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                                item.comentario 
                                  ? "border-primary bg-primary/5 text-primary" 
                                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
                              )}
                            >
                              <MessageSquare className="h-6 w-6 mb-2" />
                              <span className="text-sm font-medium">Comentário</span>
                            </button>
                            <button
                              onClick={() => toggleComplement(area.id, item.id, 'foto')}
                              className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                                item.foto 
                                  ? "border-primary bg-primary/5 text-primary" 
                                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
                              )}
                            >
                              <Camera className="h-6 w-6 mb-2" />
                              <span className="text-sm font-medium">Foto</span>
                            </button>
                            <button
                              onClick={() => toggleComplement(area.id, item.id, 'planoAcao')}
                              className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                                item.planoAcao 
                                  ? "border-primary bg-primary/5 text-primary" 
                                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
                              )}
                            >
                              <Zap className="h-6 w-6 mb-2" />
                              <span className="text-sm font-medium">Plano de Ação</span>
                            </button>
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border bg-muted/30">
                              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                Obrigatório
                              </span>
                              <Switch
                                checked={item.obrigatorio}
                                onCheckedChange={(checked) =>
                                  updateItem(area.id, item.id, { obrigatorio: checked })
                                }
                                className="mt-1"
                              />
                            </div>
                          </div>

                          {/* Vincular Ativo */}
                          <div className="p-4 rounded-xl bg-muted/30 border border-border mb-6">
                            <div className="flex items-center gap-2 mb-3">
                              <Link2 className="h-4 w-4 text-muted-foreground" />
                              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Vincular Ativo
                              </Label>
                            </div>
                            <Select value={item.ativo || ""} onValueChange={(value) => updateItem(area.id, item.id, { ativo: value })}>
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Nenhum ativo vinculado" />
                              </SelectTrigger>
                              <SelectContent className="bg-popover border border-border shadow-lg">
                                <SelectItem value="empilhadeira">Empilhadeira Elétrica</SelectItem>
                                <SelectItem value="ar">Ar Condicionado Split</SelectItem>
                                <SelectItem value="camara">Câmara Fria Açougue</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                            <Button variant="ghost" onClick={() => setEditingItem(null)}>
                              Cancelar
                            </Button>
                            <Button onClick={() => setEditingItem(null)} className="px-6">
                              Salvar Item
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingItem(item.id)}
                          className="w-full p-4 text-left transition-colors flex items-center gap-3"
                        >
                          <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
                          <span className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{item.pergunta}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {tiposItem.find(t => t.value === item.tipo)?.label || item.tipo}
                              </span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">Peso {item.peso}</span>
                              {item.obrigatorio && (
                                <>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs font-medium text-primary">Obrigatório</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {item.comentario && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                            {item.foto && <Camera className="h-4 w-4 text-muted-foreground" />}
                            {item.planoAcao && <Zap className="h-4 w-4 text-muted-foreground" />}
                          </div>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Add Area Button */}
          <Button variant="outline" className="w-full gap-2 py-6 border-dashed border-2 hover:border-primary hover:bg-primary/5">
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
