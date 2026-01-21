import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Package, X, Check, ChevronLeft } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Ativo {
  id: string;
  nome: string;
  codigo: string;
  setor: string;
  filial: string;
}

const ativosDisponiveis: Ativo[] = [
  { id: "1", nome: "Ar Condicionado Split 60k BTU", codigo: "AC-015", setor: "Loja", filial: "GUAÍBA CENTRO" },
  { id: "2", nome: "Balança Toledo Açougue", codigo: "BAL-003", setor: "Açougue", filial: "GUAÍBA CENTRO" },
  { id: "3", nome: "Câmara Fria Açougue", codigo: "CF-003", setor: "Açougue", filial: "GUAÍBA CENTRO" },
  { id: "4", nome: "Câmara Fria Laticínios", codigo: "CF-004", setor: "Frios", filial: "ARROIO DOS RATOS" },
  { id: "5", nome: "Empilhadeira Elétrica", codigo: "EMP-001", setor: "Logística", filial: "CENTRO DE DISTRIBUIÇÃO" },
  { id: "6", nome: "Freezer Horizontal 500L", codigo: "FRZ-008", setor: "Frios", filial: "ARROIO DOS RATOS" },
  { id: "7", nome: "Forno Lastro Padaria", codigo: "FRN-002", setor: "Padaria", filial: "ARROIO DOS RATOS" },
  { id: "8", nome: "Gerador de Emergência 100kVA", codigo: "GER-001", setor: "Infraestrutura", filial: "CENTRO DE DISTRIBUIÇÃO" },
  { id: "9", nome: "Compressor de Ar Industrial", codigo: "CMP-002", setor: "Manutenção", filial: "ELDORADO DO SUL" },
];

export default function SelecionarAtivo() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<string | null>(null);

  const ativosFiltrados = ativosDisponiveis.filter(
    (ativo) =>
      ativo.nome.toLowerCase().includes(busca.toLowerCase()) ||
      ativo.codigo.toLowerCase().includes(busca.toLowerCase())
  );

  const handleConfirmar = () => {
    if (selecionado) {
      // Aqui poderia passar o ativo selecionado via state ou context
      navigate(-1);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 mb-4">
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>
          <PageHeader
            title="Selecionar Ativo"
            description="Busque e selecione o ativo para vincular à manutenção ou checklist"
          />
        </div>

        {/* Search */}
        <div className="bg-card rounded-xl border border-border/50 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar ativo por nome ou nº de série..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-12 h-12 text-base"
            />
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Option: No asset */}
        <div className="bg-card rounded-xl border border-border/50 mb-4 overflow-hidden">
          <button
            onClick={() => setSelecionado(null)}
            className={cn(
              "w-full flex items-center gap-4 p-4 transition-all text-left",
              selecionado === null
                ? "bg-primary/5 border-l-4 border-l-primary"
                : "hover:bg-muted/50"
            )}
          >
            <div className={cn(
              "h-12 w-12 rounded-xl flex items-center justify-center",
              selecionado === null ? "bg-primary/10" : "bg-muted"
            )}>
              <X className={cn(
                "h-6 w-6",
                selecionado === null ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Sem Ativo</h3>
              <p className="text-sm text-muted-foreground">Não relacionar nenhum ativo</p>
            </div>
            {selecionado === null && (
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </button>
        </div>

        {/* Assets List */}
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Ativos Disponíveis ({ativosFiltrados.length})
            </span>
          </div>
          
          <div className="divide-y divide-border">
            {ativosFiltrados.map((ativo) => (
              <button
                key={ativo.id}
                onClick={() => setSelecionado(ativo.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 transition-all text-left",
                  selecionado === ativo.id
                    ? "bg-primary/5 border-l-4 border-l-primary"
                    : "hover:bg-muted/50 border-l-4 border-l-transparent"
                )}
              >
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center",
                  selecionado === ativo.id ? "bg-primary/10" : "bg-muted"
                )}>
                  <Package className={cn(
                    "h-6 w-6",
                    selecionado === ativo.id ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{ativo.nome}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{ativo.codigo}</span>
                    <span>•</span>
                    <span>{ativo.setor}</span>
                    <span>•</span>
                    <span>{ativo.filial}</span>
                  </div>
                </div>
                {selecionado === ativo.id && (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {ativosFiltrados.length === 0 && (
            <div className="p-8 text-center">
              <div className="h-12 w-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Nenhum ativo encontrado</h3>
              <p className="text-sm text-muted-foreground">
                Tente buscar por outro nome ou código
              </p>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <div className="mt-6 flex gap-3 justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmar} className="gap-2">
            <Check className="h-4 w-4" />
            Confirmar Seleção
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
