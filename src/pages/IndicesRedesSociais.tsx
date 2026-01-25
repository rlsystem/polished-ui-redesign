import { useState } from "react";
import { 
  Instagram, 
  Facebook, 
  Youtube,
  TrendingUp,
  Users,
  Eye,
  Heart,
  FileText,
  Megaphone,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Image,
  Video,
  BarChart3,
  Sparkles,
  Target,
  DollarSign,
  Zap
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Ícone TikTok customizado
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Ícone Google Ads customizado
const GoogleAdsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.25 2.25l-9.5 16.25a2.75 2.75 0 004.75 2.75l9.5-16.25a2.75 2.75 0 00-4.75-2.75z"/>
    <path d="M5.5 21.75a2.75 2.75 0 100-5.5 2.75 2.75 0 000 5.5z"/>
    <path d="M21.25 12.5l-4.75-8.25a2.75 2.75 0 00-4.75 2.75l4.75 8.25a2.75 2.75 0 004.75-2.75z"/>
  </svg>
);

// Dados por plataforma
const platformData = {
  instagram: {
    name: "Instagram",
    icon: Instagram,
    overview: {
      seguidores: { value: "52.300", change: "+1.250", positive: true },
      alcance: { value: "385.000", change: "+12.5%", positive: true },
      engajamento: { value: "24.500", change: "+8.2%", positive: true },
      conteudos: { value: "45", change: "+5", positive: true },
    },
    performance: {
      alcancePost: "8.556",
      engajamentoPost: "544",
      taxaEngajamento: "4.8%",
    },
    topContent: [
      { title: "Vídeo Promo", type: "video", views: "45.2K" },
      { title: "Post Produto", type: "image", views: "32.1K" },
      { title: "Reels Especial", type: "reels", views: "28.9K" },
    ],
    campaigns: [
      { name: "Reels Viral", reach: "120.000", value: "R$ 800,00", roi: "+340%" },
      { name: "Stories Oferta", reach: "45.000", value: "R$ 300,00", roi: "+180%" },
    ],
    totalInvested: "R$ 2.500,00",
  },
  facebook: {
    name: "Facebook",
    icon: Facebook,
    overview: {
      seguidores: { value: "38.500", change: "+820", positive: true },
      alcance: { value: "245.000", change: "+5.2%", positive: true },
      engajamento: { value: "18.200", change: "+3.1%", positive: true },
      conteudos: { value: "32", change: "+3", positive: true },
    },
    performance: {
      alcancePost: "7.656",
      engajamentoPost: "569",
      taxaEngajamento: "3.2%",
    },
    topContent: [
      { title: "Promoção Fim de Semana", type: "image", views: "38.5K" },
      { title: "Live Produto Novo", type: "video", views: "25.3K" },
      { title: "Carrossel Ofertas", type: "image", views: "22.1K" },
    ],
    campaigns: [
      { name: "Retargeting", reach: "85.000", value: "R$ 650,00", roi: "+220%" },
      { name: "Awareness", reach: "120.000", value: "R$ 450,00", roi: "+150%" },
    ],
    totalInvested: "R$ 1.800,00",
  },
  tiktok: {
    name: "TikTok",
    icon: TikTokIcon,
    overview: {
      seguidores: { value: "28.700", change: "+3.450", positive: true },
      alcance: { value: "1.250.000", change: "+45.2%", positive: true },
      engajamento: { value: "89.500", change: "+22.8%", positive: true },
      conteudos: { value: "28", change: "+8", positive: true },
    },
    performance: {
      alcancePost: "44.643",
      engajamentoPost: "3.196",
      taxaEngajamento: "7.2%",
    },
    topContent: [
      { title: "Trend Viral #1", type: "video", views: "250K" },
      { title: "Behind the Scenes", type: "video", views: "180K" },
      { title: "Tutorial Rápido", type: "video", views: "145K" },
    ],
    campaigns: [
      { name: "In-Feed Ads", reach: "450.000", value: "R$ 1.200,00", roi: "+520%" },
      { name: "Spark Ads", reach: "280.000", value: "R$ 800,00", roi: "+380%" },
    ],
    totalInvested: "R$ 3.200,00",
  },
  youtube: {
    name: "YouTube",
    icon: Youtube,
    overview: {
      seguidores: { value: "12.400", change: "+580", positive: true },
      alcance: { value: "185.000", change: "+8.5%", positive: true },
      engajamento: { value: "15.800", change: "+12.3%", positive: true },
      conteudos: { value: "18", change: "+2", positive: true },
    },
    performance: {
      alcancePost: "10.278",
      engajamentoPost: "878",
      taxaEngajamento: "8.5%",
    },
    topContent: [
      { title: "Review Completo", type: "video", views: "45.2K" },
      { title: "Shorts Viral", type: "video", views: "38.9K" },
      { title: "Tutorial Passo a Passo", type: "video", views: "28.1K" },
    ],
    campaigns: [
      { name: "Pre-Roll Ads", reach: "65.000", value: "R$ 950,00", roi: "+180%" },
      { name: "Discovery Ads", reach: "42.000", value: "R$ 550,00", roi: "+140%" },
    ],
    totalInvested: "R$ 2.100,00",
  },
  googleads: {
    name: "Google Ads",
    icon: GoogleAdsIcon,
    overview: {
      seguidores: { value: "-", change: "-", positive: true },
      alcance: { value: "520.000", change: "+15.2%", positive: true },
      engajamento: { value: "32.400", change: "+18.5%", positive: true },
      conteudos: { value: "12", change: "+3", positive: true },
    },
    performance: {
      alcancePost: "43.333",
      engajamentoPost: "2.700",
      taxaEngajamento: "6.2%",
    },
    topContent: [
      { title: "Search Campanha Principal", type: "image", views: "180K" },
      { title: "Display Remarketing", type: "image", views: "145K" },
      { title: "Shopping Produtos", type: "image", views: "95K" },
    ],
    campaigns: [
      { name: "Search Brand", reach: "220.000", value: "R$ 1.800,00", roi: "+420%" },
      { name: "Shopping", reach: "180.000", value: "R$ 2.200,00", roi: "+350%" },
      { name: "Display Network", reach: "120.000", value: "R$ 800,00", roi: "+180%" },
    ],
    totalInvested: "R$ 5.800,00",
  },
};

type PlatformKey = keyof typeof platformData;

// Componente de métrica individual - estilo BI clean
const MetricRow = ({ 
  label, 
  value, 
  change, 
  positive, 
  icon: Icon,
}: { 
  label: string; 
  value: string; 
  change?: string; 
  positive?: boolean;
  icon: React.ElementType;
}) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-md bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-foreground">{value}</span>
      {change && change !== "-" && (
        <span className={cn(
          "text-xs font-medium flex items-center",
          positive ? "text-success" : "text-destructive"
        )}>
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {change}
        </span>
      )}
    </div>
  </div>
);

// Componente de Top Conteúdo - estilo BI clean
const TopContentRow = ({ 
  title, 
  type, 
  views, 
  index,
}: { 
  title: string; 
  type: string; 
  views: string; 
  index: number;
}) => {
  const getIcon = () => {
    switch (type) {
      case "video": return Video;
      case "reels": return Play;
      default: return Image;
    }
  };
  const Icon = getIcon();
  
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
      <div className={cn(
        "w-6 h-6 rounded flex items-center justify-center text-xs font-semibold",
        index === 0 ? "bg-primary text-primary-foreground" :
        "bg-muted text-muted-foreground"
      )}>
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon className="h-3 w-3" />
          <span className="capitalize">{type}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-foreground">{views}</span>
    </div>
  );
};

// Sugestões de IA - estilo BI clean
const AISuggestions = () => {
  const suggestions = [
    {
      icon: Sparkles,
      title: "Melhor horário para postar",
      description: "Seus seguidores estão mais ativos às 19h-21h.",
    },
    {
      icon: Target,
      title: "Oportunidade de conteúdo",
      description: "Reels têm 3x mais engajamento. Aumente a frequência.",
    },
    {
      icon: Zap,
      title: "Campanha sugerida",
      description: "ROI médio de campanhas similares: +280%.",
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Sugestões da IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index}
            className="flex gap-3 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="p-2 rounded-md bg-primary/10 shrink-0">
              <suggestion.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {suggestion.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {suggestion.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default function IndicesRedesSociais() {
  const [activePlatform, setActivePlatform] = useState<PlatformKey>("instagram");
  const data = platformData[activePlatform];
  const IconComponent = data.icon;

  const platformTabs = [
    { key: "instagram" as PlatformKey, icon: Instagram, label: "Instagram" },
    { key: "facebook" as PlatformKey, icon: Facebook, label: "Facebook" },
    { key: "tiktok" as PlatformKey, icon: TikTokIcon, label: "TikTok" },
    { key: "youtube" as PlatformKey, icon: Youtube, label: "YouTube" },
    { key: "googleads" as PlatformKey, icon: GoogleAdsIcon, label: "Google Ads" },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Índices de Redes Sociais"
        description="Análise de performance por plataforma"
      />

      {/* Platform Tabs - estilo BI clean */}
      <Card className="mb-6">
        <div className="p-1 border-b border-border">
          <div className="flex gap-1 overflow-x-auto">
            {platformTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activePlatform === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActivePlatform(tab.key)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <TabIcon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Coluna 1: Visão Geral */}
        <Card>
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <IconComponent className="h-4 w-4 text-primary" />
              </div>
              Visão Geral
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <MetricRow 
              label="Seguidores Totais" 
              value={data.overview.seguidores.value}
              change={data.overview.seguidores.change}
              positive={data.overview.seguidores.positive}
              icon={Users}
            />
            <MetricRow 
              label="Crescimento" 
              value={data.overview.seguidores.change}
              positive={data.overview.seguidores.positive}
              icon={TrendingUp}
            />
            <MetricRow 
              label="Alcance Total" 
              value={data.overview.alcance.value}
              change={data.overview.alcance.change}
              positive={data.overview.alcance.positive}
              icon={Eye}
            />
            <MetricRow 
              label="Engajamento" 
              value={data.overview.engajamento.value}
              change={data.overview.engajamento.change}
              positive={data.overview.engajamento.positive}
              icon={Heart}
            />
            <MetricRow 
              label="Conteúdos" 
              value={data.overview.conteudos.value}
              change={data.overview.conteudos.change}
              positive={data.overview.conteudos.positive}
              icon={FileText}
            />
          </CardContent>
        </Card>

        {/* Coluna 2: Performance de Conteúdo */}
        <Card>
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              Performance de Conteúdo
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            {/* Métricas principais */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-md bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">Alcance/Post</p>
                <p className="text-lg font-bold text-foreground">{data.performance.alcancePost}</p>
              </div>
              <div className="p-3 rounded-md bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground mb-1">Engajamento/Post</p>
                <p className="text-lg font-bold text-foreground">{data.performance.engajamentoPost}</p>
              </div>
            </div>
            
            {/* Taxa de Engajamento */}
            <div className="p-3 rounded-md bg-primary/5 border border-primary/10 text-center mb-4">
              <p className="text-xs text-muted-foreground mb-1">Taxa de Engajamento</p>
              <p className="text-2xl font-bold text-primary">{data.performance.taxaEngajamento}</p>
            </div>

            {/* Top Conteúdos */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Top Conteúdos
              </p>
              {data.topContent.map((content, index) => (
                <TopContentRow 
                  key={index}
                  title={content.title}
                  type={content.type}
                  views={content.views}
                  index={index}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coluna 3: Anúncios & Campanhas */}
        <Card>
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Megaphone className="h-4 w-4 text-primary" />
              </div>
              Anúncios & Campanhas
            </CardTitle>
            <Badge variant="outline" className="text-xs font-medium text-success border-success/30 bg-success/10">
              Ativas
            </Badge>
          </CardHeader>
          <CardContent className="pt-3">
            {/* Tabela de campanhas */}
            <div className="mb-4">
              <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground font-medium pb-2 border-b border-border">
                <span className="col-span-1">Campanha</span>
                <span className="text-right">Alcance</span>
                <span className="text-right">Valor</span>
                <span className="text-right">ROI</span>
              </div>
              {data.campaigns.map((campaign, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-4 gap-2 py-2.5 border-b border-border last:border-0"
                >
                  <span className="col-span-1 text-sm font-medium text-foreground truncate">{campaign.name}</span>
                  <span className="text-right text-sm text-muted-foreground">{campaign.reach}</span>
                  <span className="text-right text-sm text-muted-foreground">{campaign.value}</span>
                  <span className="text-right text-sm font-semibold text-success">{campaign.roi}</span>
                </div>
              ))}
            </div>

            {/* Total Investido */}
            <div className="p-3 rounded-md bg-muted/50 border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Total Investido</span>
                </div>
                <span className="text-lg font-bold text-foreground">{data.totalInvested}</span>
              </div>
            </div>

            {/* ROI Médio */}
            <div className="mt-3 p-3 rounded-md bg-success/5 border border-success/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ROI Médio</span>
                <span className="text-lg font-bold text-success">
                  +{Math.round(data.campaigns.reduce((acc, c) => acc + parseInt(c.roi.replace(/[^0-9]/g, "")), 0) / data.campaigns.length)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sugestões de IA */}
      <div className="mt-4">
        <AISuggestions />
      </div>

      {/* Comparativo Rápido */}
      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            Comparativo entre Plataformas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {platformTabs.map((platform) => {
              const pData = platformData[platform.key];
              const PIcon = platform.icon;
              return (
                <div 
                  key={platform.key}
                  className={cn(
                    "p-3 rounded-md border transition-colors cursor-pointer",
                    activePlatform === platform.key 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                  onClick={() => setActivePlatform(platform.key)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <PIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{platform.label}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Seguidores</span>
                      <span className="font-medium text-foreground">{pData.overview.seguidores.value}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Engajamento</span>
                      <span className="font-medium text-success">{pData.performance.taxaEngajamento}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Investido</span>
                      <span className="font-medium text-foreground">{pData.totalInvested}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
