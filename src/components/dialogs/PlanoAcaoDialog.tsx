import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  AlertCircle,
  ClipboardList,
  Search,
  User,
  Calendar,
  DollarSign,
  Settings2,
} from "lucide-react";

interface PlanoAcaoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plano?: {
    id?: number;
    titulo: string;
    ativo: string;
    causaRaiz: string;
    localizacao: string;
    procedimento: string;
    responsavel: string;
    prazo: string;
    custo: string;
    prioridade: string;
    status: string;
  };
}

export function PlanoAcaoDialog({ open, onOpenChange, plano }: PlanoAcaoDialogProps) {
  const [formData, setFormData] = useState({
    titulo: plano?.titulo || "",
    ativo: plano?.ativo || "",
    causaRaiz: plano?.causaRaiz || "",
    localizacao: plano?.localizacao || "",
    procedimento: plano?.procedimento || "",
    responsavel: plano?.responsavel || "",
    prazo: plano?.prazo || "",
    custo: plano?.custo || "",
    prioridade: plano?.prioridade || "media",
    status: plano?.status || "aberto",
  });

  const handleSave = () => {
    console.log("Saving:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {plano?.id ? "Editar Plano de Ação" : "Novo Plano de Ação"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Este plano está vinculado a um ativo e será tratado como registro de manutenção.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Contexto do Problema */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <AlertCircle className="h-5 w-5 text-warning" />
              <span>Contexto do Problema</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">
                  O que será feito? (What)
                </Label>
                <Input
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ex: Manutenção de Queimadores"
                  className="border-primary/50 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Ativo Relacionado (Machine)
                </Label>
                <div className="relative">
                  <Input
                    value={formData.ativo}
                    onChange={(e) => setFormData({ ...formData, ativo: e.target.value })}
                    placeholder="Buscar ativo..."
                    className="pr-9"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Causa Raiz (Why)
                </Label>
                <Textarea
                  value={formData.causaRaiz}
                  onChange={(e) => setFormData({ ...formData, causaRaiz: e.target.value })}
                  placeholder="Descreva a causa do problema..."
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Localização (Where)
                </Label>
                <Textarea
                  value={formData.localizacao}
                  onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                  placeholder="Ex: Padaria - Área de Produção"
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Plano de Execução */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <ClipboardList className="h-5 w-5 text-primary" />
              <span>Plano de Execução</span>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Procedimento (How)
              </Label>
              <Textarea
                value={formData.procedimento}
                onChange={(e) => setFormData({ ...formData, procedimento: e.target.value })}
                placeholder="1. Primeiro passo&#10;2. Segundo passo&#10;3. Terceiro passo"
                className="min-h-[120px] font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  Responsável (Who)
                </Label>
                <div className="relative">
                  <Input
                    value={formData.responsavel}
                    onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                    placeholder="Buscar responsável..."
                    className="pr-9"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Prazo (When)
                </Label>
                <Input
                  type="date"
                  value={formData.prazo}
                  onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  Custo (How Much)
                </Label>
                <Input
                  value={formData.custo}
                  onChange={(e) => setFormData({ ...formData, custo: e.target.value })}
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
          </div>

          {/* Configurações Administrativas */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Settings2 className="h-5 w-5 text-muted-foreground" />
              <span>Configurações Administrativas</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Prioridade</Label>
                <Select
                  value={formData.prioridade}
                  onValueChange={(value) => setFormData({ ...formData, prioridade: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="critica">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aberto">Aberto</SelectItem>
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="resolvido">Resolvido</SelectItem>
                    <SelectItem value="verificado">Verificado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
