import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Camera,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Questao {
  id: number;
  texto: string;
  peso: number;
  resposta?: "sim" | "nao" | "na";
  observacao?: string;
  foto?: string;
}

const questoesIniciais: Questao[] = [
  {
    id: 1,
    texto: "A temperatura da Câmara Fria está dentro do padrão (-18°C a -22°C)?",
    peso: 10,
  },
  {
    id: 2,
    texto: "Os produtos estão organizados e etiquetados corretamente?",
    peso: 8,
  },
  {
    id: 3,
    texto: "A limpeza do ambiente está adequada conforme o manual?",
    peso: 9,
  },
  {
    id: 4,
    texto: "Os equipamentos de proteção estão disponíveis e em bom estado?",
    peso: 7,
  },
  {
    id: 5,
    texto: "O controle de validade está sendo feito diariamente?",
    peso: 10,
  },
];

type RespostaType = "sim" | "nao" | "na";

export default function ExecutarAuditoria() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [questoes, setQuestoes] = useState<Questao[]>(questoesIniciais);
  const [questaoAtual, setQuestaoAtual] = useState(0);

  const questao = questoes[questaoAtual];
  const totalQuestoes = questoes.length;
  const questoesRespondidas = questoes.filter((q) => q.resposta).length;
  const progresso = (questoesRespondidas / totalQuestoes) * 100;

  const handleResposta = (resposta: RespostaType) => {
    setQuestoes((prev) =>
      prev.map((q, idx) =>
        idx === questaoAtual ? { ...q, resposta } : q
      )
    );
  };

  const handleObservacao = (observacao: string) => {
    setQuestoes((prev) =>
      prev.map((q, idx) =>
        idx === questaoAtual ? { ...q, observacao } : q
      )
    );
  };

  const handleProxima = () => {
    if (questaoAtual < totalQuestoes - 1) {
      setQuestaoAtual((prev) => prev + 1);
    } else {
      // Finalizar auditoria
      navigate("/auditorias");
    }
  };

  const handleAnterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual((prev) => prev - 1);
    }
  };

  const handleFoto = () => {
    // Simular captura de foto
    setQuestoes((prev) =>
      prev.map((q, idx) =>
        idx === questaoAtual ? { ...q, foto: "foto_capturada.jpg" } : q
      )
    );
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/auditorias")}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Auditorias
          </Button>
        </div>

        {/* Progress Header */}
        <div className="bg-card rounded-xl border border-border/50 p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Questão {questaoAtual + 1} de {totalQuestoes}
            </span>
            <span className="text-sm font-semibold text-primary">
              {Math.round(progresso)}% Completo
            </span>
          </div>
          <Progress value={progresso} className="h-2" />
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-card overflow-hidden">
          {/* Weight Badge */}
          <div className="flex justify-end p-4 pb-0">
            <div className="bg-muted px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-muted-foreground">
                Peso: {questao.peso}
              </span>
            </div>
          </div>

          {/* Question */}
          <div className="px-6 py-8">
            <h2 className="text-xl font-semibold text-foreground leading-relaxed">
              {questao.texto}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleResposta("sim")}
                className={cn(
                  "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all",
                  questao.resposta === "sim"
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                    : "border-border hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5"
                )}
              >
                <CheckCircle2
                  className={cn(
                    "h-8 w-8",
                    questao.resposta === "sim"
                      ? "text-emerald-600"
                      : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "font-semibold text-lg",
                    questao.resposta === "sim"
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-foreground"
                  )}
                >
                  SIM
                </span>
              </button>

              <button
                onClick={() => handleResposta("nao")}
                className={cn(
                  "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all",
                  questao.resposta === "nao"
                    ? "border-red-500 bg-red-50 dark:bg-red-500/10"
                    : "border-border hover:border-red-300 hover:bg-red-50/50 dark:hover:bg-red-500/5"
                )}
              >
                <XCircle
                  className={cn(
                    "h-8 w-8",
                    questao.resposta === "nao"
                      ? "text-red-600"
                      : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "font-semibold text-lg",
                    questao.resposta === "nao"
                      ? "text-red-700 dark:text-red-400"
                      : "text-foreground"
                  )}
                >
                  NÃO
                </span>
              </button>

              <button
                onClick={() => handleResposta("na")}
                className={cn(
                  "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all",
                  questao.resposta === "na"
                    ? "border-amber-500 bg-amber-50 dark:bg-amber-500/10"
                    : "border-border hover:border-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-500/5"
                )}
              >
                <AlertTriangle
                  className={cn(
                    "h-8 w-8",
                    questao.resposta === "na"
                      ? "text-amber-600"
                      : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "font-semibold text-lg",
                    questao.resposta === "na"
                      ? "text-amber-700 dark:text-amber-400"
                      : "text-foreground"
                  )}
                >
                  N/A
                </span>
              </button>
            </div>
          </div>

          {/* Observation */}
          <div className="px-6 pb-6">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Observações <span className="text-muted-foreground/60">(Opcional)</span>
            </label>
            <Textarea
              placeholder="Digite uma observação..."
              value={questao.observacao || ""}
              onChange={(e) => handleObservacao(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Photo Evidence */}
          <div className="px-6 pb-6">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Evidência (Foto)
            </label>
            <button
              onClick={handleFoto}
              className={cn(
                "w-full border-2 border-dashed rounded-xl p-8 transition-all",
                questao.foto
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div className="flex flex-col items-center gap-2">
                <Camera
                  className={cn(
                    "h-10 w-10",
                    questao.foto ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-sm",
                    questao.foto
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {questao.foto
                    ? "Foto capturada ✓"
                    : "Toque para tirar foto"}
                </span>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <div className="px-6 pb-6">
            <Button
              onClick={handleProxima}
              disabled={!questao.resposta}
              className="w-full h-14 text-lg font-semibold gap-2 bg-gradient-to-r from-primary to-primary/80"
            >
              {questaoAtual < totalQuestoes - 1
                ? "Confirmar e Próxima"
                : "Finalizar Auditoria"}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Location Footer */}
          <div className="bg-muted/30 px-6 py-3 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Localização capturada</span>
            </div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleAnterior}
            disabled={questaoAtual === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          
          <div className="flex gap-2">
            {questoes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setQuestaoAtual(idx)}
                className={cn(
                  "h-3 w-3 rounded-full transition-all",
                  idx === questaoAtual
                    ? "bg-primary w-6"
                    : questoes[idx].resposta
                    ? "bg-primary/50"
                    : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={handleProxima}
            disabled={questaoAtual === totalQuestoes - 1}
            className="gap-2"
          >
            Próxima
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
