import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Tag,
  Building2,
  Factory,
  Monitor,
  Hash,
  ImagePlus,
  Upload,
} from "lucide-react";
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
  { id: "geral", label: "Geral" },
  { id: "detalhes", label: "Detalhes & Custos" },
  { id: "documentos", label: "Documentos" },
];

const filiais = [
  "GUAÍBA CENTRO",
  "ARROIO DOS RATOS",
  "CENTRO DE DISTRIBUIÇÃO",
];

const setores = [
  "Açougue",
  "Padaria",
  "Frios",
  "Estoque",
  "Administrativo",
  "Manutenção",
];

export default function NovoPatrimonio() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("geral");
  const [formData, setFormData] = useState({
    nome: "",
    status: "ativo",
    filial: "",
    setor: "",
    fabricante: "",
    modelo: "",
    numeroSerie: "",
    observacoes: "",
    // Detalhes
    dataAquisicao: "",
    valorAquisicao: "",
    vidaUtil: "",
    garantia: "",
    fornecedor: "",
  });

  return (
    <MainLayout>
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/bens-equipamentos")}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Novo Patrimônio
          </h1>
          <p className="text-sm text-muted-foreground">
            Cadastre um novo ativo patrimonial no sistema
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
              "px-6 py-2.5 text-sm font-medium transition-colors relative",
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
      <div className="bg-card rounded-lg shadow-card border border-border/50 p-6">
        {activeTab === "geral" && (
          <div className="space-y-6">
            {/* Nome e Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="flex items-center gap-1">
                  Nome do Patrimônio <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nome"
                    placeholder="Ex: Notebook Dell Latitude 5520"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        Ativo
                      </div>
                    </SelectItem>
                    <SelectItem value="manutencao">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-warning" />
                        Em Manutenção
                      </div>
                    </SelectItem>
                    <SelectItem value="inativo">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                        Inativo
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filial e Setor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Filial <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.filial}
                  onValueChange={(value) =>
                    setFormData({ ...formData, filial: value })
                  }
                >
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Selecione..." />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {filiais.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Setor / Categoria</Label>
                <Select
                  value={formData.setor}
                  onValueChange={(value) =>
                    setFormData({ ...formData, setor: value })
                  }
                >
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Selecione..." />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {setores.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fabricante, Modelo e Série */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Fabricante / Marca</Label>
                <div className="relative">
                  <Factory className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Ex: Dell"
                    value={formData.fabricante}
                    onChange={(e) =>
                      setFormData({ ...formData, fabricante: e.target.value })
                    }
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Modelo</Label>
                <div className="relative">
                  <Monitor className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Ex: Latitude"
                    value={formData.modelo}
                    onChange={(e) =>
                      setFormData({ ...formData, modelo: e.target.value })
                    }
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Número de Série</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Ex: ABC123XYZ"
                    value={formData.numeroSerie}
                    onChange={(e) =>
                      setFormData({ ...formData, numeroSerie: e.target.value })
                    }
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label>Observações</Label>
              <Textarea
                placeholder="Detalhes adicionais..."
                value={formData.observacoes}
                onChange={(e) =>
                  setFormData({ ...formData, observacoes: e.target.value })
                }
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Galeria de Fotos */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <ImagePlus className="h-4 w-4" />
                  Galeria de Fotos
                </Label>
                <span className="text-sm text-muted-foreground">
                  0 fotos adicionadas
                </span>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Clique para adicionar fotos ou arraste os arquivos aqui
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "detalhes" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Data de Aquisição</Label>
                <Input
                  type="date"
                  value={formData.dataAquisicao}
                  onChange={(e) =>
                    setFormData({ ...formData, dataAquisicao: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Valor de Aquisição</Label>
                <Input
                  placeholder="R$ 0,00"
                  value={formData.valorAquisicao}
                  onChange={(e) =>
                    setFormData({ ...formData, valorAquisicao: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Vida Útil (meses)</Label>
                <Input
                  type="number"
                  placeholder="Ex: 60"
                  value={formData.vidaUtil}
                  onChange={(e) =>
                    setFormData({ ...formData, vidaUtil: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Garantia até</Label>
                <Input
                  type="date"
                  value={formData.garantia}
                  onChange={(e) =>
                    setFormData({ ...formData, garantia: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Fornecedor</Label>
                <Input
                  placeholder="Nome do fornecedor"
                  value={formData.fornecedor}
                  onChange={(e) =>
                    setFormData({ ...formData, fornecedor: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "documentos" && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-foreground mb-1">
                Adicionar Documentos
              </p>
              <p className="text-sm text-muted-foreground">
                Manuais, notas fiscais, certificados, etc.
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button>
            Salvar Patrimônio
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
