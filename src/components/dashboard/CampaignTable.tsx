import { cn } from "@/lib/utils";

interface Campaign {
  name: string;
  reach: string;
  engagement: string;
  investment: string;
}

interface CampaignTableProps {
  campaigns: Campaign[];
  className?: string;
}

export function CampaignTable({ campaigns, className }: CampaignTableProps) {
  return (
    <div className={cn("rounded-lg shadow-card border border-border/50 bg-card overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-gradient-to-r from-sidebar-background to-sidebar-accent">
        <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <h3 className="font-semibold text-sm text-white">Anúncios & Campanhas</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="text-left px-4 py-2 font-medium text-muted-foreground">Campanha</th>
              <th className="text-right px-4 py-2 font-medium text-muted-foreground">Alcance</th>
              <th className="text-right px-4 py-2 font-medium text-muted-foreground">Engajamento</th>
              <th className="text-right px-4 py-2 font-medium text-muted-foreground">Valor Investido</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={index} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-2.5 font-medium text-foreground">{campaign.name}</td>
                <td className="px-4 py-2.5 text-right text-muted-foreground">{campaign.reach}</td>
                <td className="px-4 py-2.5 text-right text-muted-foreground">{campaign.engagement}</td>
                <td className="px-4 py-2.5 text-right font-medium text-foreground">{campaign.investment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
