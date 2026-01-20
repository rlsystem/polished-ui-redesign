import { 
  ClipboardCheck, 
  Wrench, 
  Bell, 
  AlertTriangle,
  Users,
  TrendingUp,
  ShoppingCart,
  MessageSquare,
  Instagram,
  Gift,
  FileText,
  DollarSign,
  Target
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { AIChatPanel } from "@/components/chat/AIChatPanel";
import { MetricSection } from "@/components/dashboard/MetricSection";
import { CampaignTable } from "@/components/dashboard/CampaignTable";
import { OverviewBar } from "@/components/dashboard/OverviewBar";
import { TopContentList } from "@/components/dashboard/TopContentList";

// Dados de exemplo - inspirados no layout de referência
const socialMediaMetrics = [
  { label: "Seguidores Totais", value: "52.300" },
  { label: "Crescimento no Período", value: "+1.250", highlight: true },
  { label: "Alcance Total", value: "385.000" },
  { label: "Engajamento Total", value: "24.500" },
  { label: "Conteúdos Publicados", value: "45" },
];

const contentPerformanceMetrics = [
  { label: "Alcance por Conteúdo", value: "18.200" },
  { label: "Engajamento por Conteúdo", value: "1.350" },
];

const topContent = ["Vídeo Promo", "Post Produto", "Reels Especial"];

const clubeVantagensMetrics = [
  { label: "Clientes Cadastrados", value: "18.400" },
  { label: "Novos Cadastros", value: "630" },
  { label: "Compras do Clube", value: "320" },
  { label: "Vendas do Clube", value: "R$ 48.500" },
];

const whatsappMetrics = [
  { label: "Contatos Ativos", value: "8.700" },
  { label: "Novos Contatos", value: "450" },
  { label: "Taxa de Crescimento", value: "+5,2%", highlight: true },
];

const vendasOnlineMetrics = [
  { label: "Vendas no Mês", value: "R$ 95.200" },
  { label: "Pedidos Realizados", value: "1.150" },
  { label: "Ticket Médio", value: "R$ 82,80" },
  { label: "Clientes Únicos", value: "980" },
];

const campaignData = [
  { name: "Promo de Verão", reach: "120.000", engagement: "8.500", investment: "R$ 3.200" },
  { name: "Oferta Especial", reach: "85.000", engagement: "6.200", investment: "R$ 2.500" },
];

const overviewItems = [
  { label: "Novos Seguidores", value: "+1.250" },
  { label: "Novos Cadastros", value: "1.080" },
  { label: "Receita do Clube", value: "R$ 48.500" },
  { label: "Investimento em Mídia", value: "R$ 5.700" },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        description="Painel de controle estratégico da empresa"
      />

      {/* Primary Stats - Operacional */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Auditorias Pendentes"
          value={12}
          icon={<ClipboardCheck className="h-5 w-5" />}
          variant="primary"
          trend={{ value: 8, isPositive: false }}
        />
        <StatCard
          label="Manutenções Agendadas"
          value={8}
          icon={<Wrench className="h-5 w-5" />}
          variant="warning"
        />
        <StatCard
          label="Planos de Ação Abertos"
          value={5}
          icon={<AlertTriangle className="h-5 w-5" />}
          variant="destructive"
        />
        <StatCard
          label="Avisos Ativos"
          value={3}
          icon={<Bell className="h-5 w-5" />}
          variant="success"
        />
      </div>

      {/* KPIs Estratégicos - Primeira linha */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Redes Sociais */}
        <MetricSection
          title="Redes Sociais"
          icon={<Instagram className="h-4 w-4 text-primary" />}
          iconBgColor="bg-gradient-to-br from-pink-500/20 to-purple-500/20"
          metrics={socialMediaMetrics}
        />

        {/* Performance de Conteúdo */}
        <MetricSection
          title="Performance de Conteúdo"
          icon={<TrendingUp className="h-4 w-4 text-white" />}
          variant="gradient-blue"
          metrics={contentPerformanceMetrics}
        >
          <TopContentList title="Top Conteúdos" items={topContent} isGradient />
        </MetricSection>

        {/* Clube de Vantagens */}
        <MetricSection
          title="Clube de Vantagens"
          icon={<Gift className="h-4 w-4 text-white" />}
          variant="gradient-dark"
          metrics={clubeVantagensMetrics}
        />
      </div>

      {/* KPIs Estratégicos - Segunda linha */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* WhatsApp Ofertas */}
        <MetricSection
          title="WhatsApp Ofertas"
          icon={<MessageSquare className="h-4 w-4 text-success" />}
          iconBgColor="bg-success/10"
          metrics={whatsappMetrics}
        />

        {/* Vendas Online */}
        <MetricSection
          title="Vendas Online (Instabuy)"
          icon={<ShoppingCart className="h-4 w-4 text-white" />}
          variant="gradient-blue"
          metrics={vendasOnlineMetrics}
        />

        {/* Anúncios & Campanhas */}
        <CampaignTable campaigns={campaignData} />
      </div>

      {/* Visão Geral - Barra azul */}
      <OverviewBar items={overviewItems} className="mb-6" />

      {/* Chat IA - Largura total */}
      <div className="mb-6">
        <AIChatPanel />
      </div>

      {/* Secondary Stats - Indicadores de Equipe */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Usuários Ativos"
          value={18}
          icon={<Users className="h-5 w-5" />}
          variant="primary"
        />
        <StatCard
          label="Tarefas Concluídas Hoje"
          value={24}
          icon={<Target className="h-5 w-5" />}
          variant="success"
        />
        <StatCard
          label="Documentos Pendentes"
          value={7}
          icon={<FileText className="h-5 w-5" />}
          variant="warning"
        />
        <StatCard
          label="Faturamento Mensal"
          value="R$ 143.700"
          icon={<DollarSign className="h-5 w-5" />}
          variant="success"
          trend={{ value: 12, isPositive: true }}
        />
      </div>
    </MainLayout>
  );
}
