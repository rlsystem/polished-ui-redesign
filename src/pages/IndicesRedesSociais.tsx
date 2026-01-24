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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    color: "from-pink-500 to-purple-600",
    accentColor: "text-pink-500",
    bgAccent: "bg-pink-500/10",
    borderAccent: "border-pink-500/20",
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
    color: "from-blue-600 to-blue-700",
    accentColor: "text-blue-500",
    bgAccent: "bg-blue-500/10",
    borderAccent: "border-blue-500/20",
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
    color: "from-gray-900 to-gray-800",
    accentColor: "text-gray-900",
    bgAccent: "bg-gray-900/10",
    borderAccent: "border-gray-900/20",
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
    color: "from-red-600 to-red-700",
    accentColor: "text-red-500",
    bgAccent: "bg-red-500/10",
    borderAccent: "border-red-500/20",
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
    color: "from-yellow-500 to-orange-500",
    accentColor: "text-yellow-600",
    bgAccent: "bg-yellow-500/10",
    borderAccent: "border-yellow-500/20",
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

// Componente de métrica individual premium
const MetricCard = ({ 
  label, 
  value, 
  change, 
  positive, 
  icon: Icon,
  accentColor 
}: { 
  label: string; 
  value: string; 
  change?: string; 
  positive?: boolean;
  icon: React.ElementType;
  accentColor: string;
}) => (
  <div className="flex items-center justify-between py-3.5 border-b border-border/50 last:border-0 group hover:bg-muted/30 px-1 -mx-1 rounded transition-colors">
    <div className="flex items-center gap-3">
      <div className={cn("p-2 rounded-lg", accentColor.replace("text-", "bg-").replace("500", "500/10"))}>
        <Icon className={cn("h-4 w-4", accentColor)} />
      </div>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-foreground">{value}</span>
      {change && change !== "-" && (
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs font-semibold border-0",
            positive 
              ? "bg-emerald-500/10 text-emerald-600" 
              : "bg-rose-500/10 text-rose-600"
          )}
        >
          {positive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
          {change}
        </Badge>
      )}
    </div>
  </div>
);

// Componente de Top Conteúdo
const TopContentItem = ({ 
  title, 
  type, 
  views, 
  index,
  accentColor 
}: { 
  title: string; 
  type: string; 
  views: string; 
  index: number;
  accentColor: string;
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
    <div className="flex items-center gap-3 py-2.5 group">
      <div className={cn(
        "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
        index === 0 ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white" :
        index === 1 ? "bg-gradient-to-br from-slate-300 to-slate-500 text-white" :
        "bg-gradient-to-br from-amber-600 to-amber-800 text-white"
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
      <div className={cn("text-sm font-semibold", accentColor)}>{views}</div>
    </div>
  );
};

// Componente principal de sugestões de IA
const AISuggestions = ({ platform }: { platform: PlatformKey }) => {
  const suggestions = [
    {
      icon: Sparkles,
      title: "Melhor horário para postar",
      description: "Seus seguidores estão mais ativos às 19h-21h. Considere agendar posts nesse período.",
      type: "insight"
    },
    {
      icon: Target,
      title: "Oportunidade de conteúdo",
      description: "Reels têm 3x mais engajamento. Aumente a frequência de vídeos curtos.",
      type: "action"
    },
    {
      icon: Zap,
      title: "Campanha sugerida",
      description: "ROI médio de campanhas similares: +280%. Considere investir R$ 500 em remarketing.",
      type: "opportunity"
    }
  ];

  return (
    <Card className="border-dashed border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          Sugestões da IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index}
            className="flex gap-3 p-3 rounded-lg bg-background/60 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer group"
          >
            <div className={cn(
              "p-2 rounded-lg shrink-0",
              suggestion.type === "insight" ? "bg-blue-500/10" :
              suggestion.type === "action" ? "bg-emerald-500/10" :
              "bg-amber-500/10"
            )}>
              <suggestion.icon className={cn(
                "h-4 w-4",
                suggestion.type === "insight" ? "text-blue-500" :
                suggestion.type === "action" ? "text-emerald-500" :
                "text-amber-500"
              )} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {suggestion.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
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
    { key: "instagram" as PlatformKey, icon: Instagram, label: "Instagram", color: "text-pink-500", dot: "bg-pink-500" },
    { key: "facebook" as PlatformKey, icon: Facebook, label: "Facebook", color: "text-blue-600", dot: "bg-blue-600" },
    { key: "tiktok" as PlatformKey, icon: TikTokIcon, label: "TikTok", color: "text-gray-900", dot: "bg-gray-900" },
    { key: "youtube" as PlatformKey, icon: Youtube, label: "YouTube", color: "text-red-500", dot: "bg-red-500" },
    { key: "googleads" as PlatformKey, icon: GoogleAdsIcon, label: "Google Ads", color: "text-yellow-600", dot: "bg-yellow-500" },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Índices de Redes Sociais"
        description="Análise detalhada de performance por plataforma"
      />

      {/* Platform Tabs Premium */}
      <Card className="mb-6 overflow-hidden">
        <div className="p-1.5 bg-muted/30">
          <div className="flex gap-1 overflow-x-auto">
            {platformTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activePlatform === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActivePlatform(tab.key)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                    isActive 
                      ? "bg-background shadow-sm text-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-full", tab.dot, !isActive && "opacity-50")} />
                  <TabIcon className={cn("h-4 w-4", isActive ? tab.color : "")} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna 1: Visão Geral */}
        <Card className="lg:col-span-1 overflow-hidden">
          <CardHeader className="pb-2 border-b border-border/50">
            <CardTitle className="text-base font-semibold flex items-center gap-3">
              <div className={cn("p-2 rounded-xl bg-gradient-to-br", data.color)}>
                <IconComponent className="h-5 w-5 text-white" />
              </div>
              Visão Geral
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <MetricCard 
              label="Seguidores Totais" 
              value={data.overview.seguidores.value}
              change={data.overview.seguidores.change}
              positive={data.overview.seguidores.positive}
              icon={Users}
              accentColor={data.accentColor}
            />
            <MetricCard 
              label="Crescimento" 
              value={data.overview.seguidores.change}
              positive={data.overview.seguidores.positive}
              icon={TrendingUp}
              accentColor={data.accentColor}
            />
            <MetricCard 
              label="Alcance Total" 
              value={data.overview.alcance.value}
              change={data.overview.alcance.change}
              positive={data.overview.alcance.positive}
              icon={Eye}
              accentColor={data.accentColor}
            />
            <MetricCard 
              label="Engajamento" 
              value={data.overview.engajamento.value}
              change={data.overview.engajamento.change}
              positive={data.overview.engajamento.positive}
              icon={Heart}
              accentColor={data.accentColor}
            />
            <MetricCard 
              label="Conteúdos" 
              value={data.overview.conteudos.value}
              change={data.overview.conteudos.change}
              positive={data.overview.conteudos.positive}
              icon={FileText}
              accentColor={data.accentColor}
            />
          </CardContent>
        </Card>

        {/* Coluna 2: Performance de Conteúdo */}
        <Card className="lg:col-span-1 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0">
          <CardHeader className="pb-3 border-b border-white/10">
            <CardTitle className="text-base font-semibold flex items-center gap-3 text-white">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              Performance de Conteúdo
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Métricas principais */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur">
                <p className="text-xs text-white/70 mb-1 font-medium">Alcance/Post</p>
                <p className="text-2xl font-bold">{data.performance.alcancePost}</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/10 backdrop-blur">
                <p className="text-xs text-white/70 mb-1 font-medium">Engajamento/Post</p>
                <p className="text-2xl font-bold">{data.performance.engajamentoPost}</p>
              </div>
            </div>
            
            {/* Taxa de Engajamento Highlight */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur mb-6 text-center">
              <p className="text-xs text-white/70 mb-1 font-medium">Taxa de Engajamento</p>
              <p className="text-3xl font-bold text-emerald-300">{data.performance.taxaEngajamento}</p>
            </div>

            {/* Top Conteúdos */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-amber-400/20 text-amber-300 border-amber-400/30 hover:bg-amber-400/30">
                  Top Conteúdos
                </Badge>
              </div>
              {data.topContent.map((content, index) => (
                <TopContentItem 
                  key={index}
                  title={content.title}
                  type={content.type}
                  views={content.views}
                  index={index}
                  accentColor="text-white"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coluna 3: Anúncios & Campanhas */}
        <Card className="lg:col-span-1 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
          <CardHeader className="pb-3 border-b border-white/10 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-3 text-white">
              <div className="p-2 rounded-xl bg-primary/20 backdrop-blur">
                <Megaphone className="h-5 w-5 text-primary" />
              </div>
              Anúncios & Campanhas
            </CardTitle>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              Ativas
            </Badge>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Tabela de campanhas */}
            <div className="space-y-1 mb-6">
              <div className="grid grid-cols-4 gap-2 text-xs text-white/50 font-medium pb-2 border-b border-white/10">
                <span className="col-span-1">Campanha</span>
                <span className="text-right">Alcance</span>
                <span className="text-right">Valor</span>
                <span className="text-right">ROI</span>
              </div>
              {data.campaigns.map((campaign, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-4 gap-2 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 rounded transition-colors"
                >
                  <span className="col-span-1 text-sm font-medium text-white truncate">{campaign.name}</span>
                  <span className="text-right text-sm text-white/80">{campaign.reach}</span>
                  <span className="text-right text-sm text-white/80">{campaign.value}</span>
                  <span className="text-right text-sm font-semibold text-emerald-400">{campaign.roi}</span>
                </div>
              ))}
            </div>

            {/* Total Investido */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-sm text-white/70 font-medium">Total Investido</span>
                </div>
                <span className="text-xl font-bold text-white">{data.totalInvested}</span>
              </div>
            </div>

            {/* ROI Médio */}
            <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-emerald-300 font-medium">ROI Médio das Campanhas</span>
                <span className="text-lg font-bold text-emerald-400">
                  +{Math.round(data.campaigns.reduce((acc, c) => acc + parseInt(c.roi.replace(/[^0-9]/g, "")), 0) / data.campaigns.length)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sugestões de IA */}
      <div className="mt-6">
        <AISuggestions platform={activePlatform} />
      </div>

      {/* Comparativo Rápido */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Comparativo Rápido entre Plataformas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {platformTabs.map((platform) => {
              const pData = platformData[platform.key];
              const PIcon = platform.icon;
              return (
                <div 
                  key={platform.key}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md",
                    activePlatform === platform.key 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setActivePlatform(platform.key)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <PIcon className={cn("h-5 w-5", platform.color)} />
                    <span className="text-sm font-medium">{platform.label}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Seguidores</span>
                      <span className="font-semibold">{pData.overview.seguidores.value}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Engajamento</span>
                      <span className="font-semibold text-emerald-600">{pData.performance.taxaEngajamento}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Investido</span>
                      <span className="font-semibold">{pData.totalInvested}</span>
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
