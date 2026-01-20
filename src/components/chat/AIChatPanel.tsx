import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Clock, ChevronDown, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Histórico pré-definido de conversa
const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Olá! Sou a IA do Sistema de Gestão. Posso ajudá-lo com informações sobre auditorias, manutenções, planos de ação e muito mais. Como posso ajudar hoje?",
    timestamp: "09:00",
  },
  {
    id: 2,
    role: "user",
    content: "Quais auditorias estão pendentes para esta semana?",
    timestamp: "09:01",
  },
  {
    id: 3,
    role: "assistant",
    content: "Você tem **3 auditorias pendentes** para esta semana:\n\n1. **Avaliação Açougue** - ARROIO DOS RATOS (05/01)\n2. **Avaliação Padaria** - GUAÍBA CENTRO (06/01)\n3. **Inspeção Frios** - CENTRO DISTRIBUIÇÃO (07/01)\n\nDeseja que eu detalhe alguma delas?",
    timestamp: "09:01",
  },
  {
    id: 4,
    role: "user",
    content: "Qual foi o desempenho médio das auditorias no último mês?",
    timestamp: "09:03",
  },
  {
    id: 5,
    role: "assistant",
    content: "O desempenho médio das auditorias no último mês foi de **87.5%** de conformidade.\n\n📊 **Resumo por setor:**\n- Açougue: 92%\n- Padaria: 78%\n- Frios: 100%\n- Hortifruti: 85%\n\n⚠️ A Padaria apresentou o menor índice. Recomendo verificar os planos de ação pendentes para esse setor.",
    timestamp: "09:03",
  },
  {
    id: 6,
    role: "user",
    content: "Existe alguma manutenção atrasada?",
    timestamp: "09:05",
  },
  {
    id: 7,
    role: "assistant",
    content: "Sim, identifiquei **1 manutenção** que requer atenção:\n\n🔧 **Verificação de temperatura e vedação**\n- Equipamento: Câmara Fria Açougue\n- Local: GUAÍBA CENTRO\n- Data agendada: 12/02/2026\n- Responsável: Adrian da Silva Brochado\n\nEssa manutenção preventiva é importante para evitar perdas de mercadoria. Deseja que eu envie um lembrete ao responsável?",
    timestamp: "09:05",
  },
];

export function AIChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponses = [
        "Entendi sua solicitação! Deixe-me verificar as informações no sistema...",
        "Com base nos dados disponíveis, posso informar que o sistema está funcionando corretamente. Há algo específico que gostaria de saber?",
        "Certo! Processei sua requisição. Você pode encontrar mais detalhes na seção correspondente do menu lateral.",
      ];
      
      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Função para renderizar markdown simples
  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Bold
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      return (
        <span key={index} className="block" dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }} />
      );
    });
  };

  return (
    <div className={cn(
      "bg-card rounded-lg shadow-card border border-border/50 flex flex-col transition-all",
      isExpanded ? "h-[600px]" : "h-[400px]"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">Assistente IA</h3>
            <p className="text-xs text-muted-foreground">Sempre disponível para ajudar</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              message.role === "user" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted"
            )}>
              {message.role === "user" ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className={cn(
              "max-w-[80%] rounded-xl px-4 py-2.5",
              message.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-muted rounded-bl-sm"
            )}>
              <div className="text-sm leading-relaxed">
                {renderContent(message.content)}
              </div>
              <div className={cn(
                "flex items-center gap-1 mt-1.5 text-[10px]",
                message.role === "user" ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
              )}>
                <Clock className="h-3 w-3" />
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-muted rounded-xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 h-10 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="h-10 w-10 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Pressione Enter para enviar • Shift+Enter para nova linha
        </p>
      </div>
    </div>
  );
}
