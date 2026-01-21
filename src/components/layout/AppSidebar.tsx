import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  ClipboardCheck,
  FileText,
  Bell,
  Users,
  Building2,
  Settings,
  ChevronDown,
  ChevronRight,
  Bot,
  MessageSquare,
  ListChecks,
  ClipboardList,
  Calendar,
  History,
  Package,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

interface NavGroupProps {
  icon: React.ElementType;
  label: string;
  children: NavItemProps[];
  defaultOpen?: boolean;
}

const NavItem = ({ to, icon: Icon, label, badge }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
      {badge !== undefined && (
        <span className="ml-auto bg-sidebar-primary text-sidebar-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

const NavGroup = ({ icon: Icon, label, children, defaultOpen = false }: NavGroupProps) => {
  const location = useLocation();
  const hasActiveChild = children.some(child => location.pathname === child.to);
  const [isOpen, setIsOpen] = useState(defaultOpen || hasActiveChild);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent",
          hasActiveChild && "text-sidebar-foreground"
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="truncate">{label}</span>
        <span className="ml-auto">
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-3">
          {children.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

interface AppSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function AppSidebar({ collapsed = false, onToggle }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Bot className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">IA Supermercados</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-md text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className={cn("flex-1 overflow-y-auto py-4", collapsed ? "px-2" : "px-3")}>
        {collapsed ? (
          <div className="space-y-2">
            <NavLink to="/" className={({ isActive }) => cn(
              "flex items-center justify-center p-2 rounded-md transition-colors",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
            )}>
              <LayoutDashboard className="h-5 w-5" />
            </NavLink>
            <NavLink to="/manutencoes" className={({ isActive }) => cn(
              "flex items-center justify-center p-2 rounded-md transition-colors",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
            )}>
              <Wrench className="h-5 w-5" />
            </NavLink>
            <NavLink to="/auditorias" className={({ isActive }) => cn(
              "flex items-center justify-center p-2 rounded-md transition-colors",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
            )}>
              <ClipboardCheck className="h-5 w-5" />
            </NavLink>
            <NavLink to="/avisos" className={({ isActive }) => cn(
              "flex items-center justify-center p-2 rounded-md transition-colors",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
            )}>
              <Bell className="h-5 w-5" />
            </NavLink>
          </div>
        ) : (
          <div className="space-y-1">
            <NavItem to="/" icon={LayoutDashboard} label="Início" />
            
            <NavGroup
              icon={Bot}
              label="Agentes de IA"
              children={[
                { to: "/agentes/chat", icon: MessageSquare, label: "Chat" },
                { to: "/agentes/automacoes", icon: Bot, label: "Automações" },
              ]}
            />

            <NavItem to="/documentos" icon={FileText} label="Documentos" />
            <NavItem to="/chat-ia" icon={MessageSquare} label="Chat Índio IA" />

            <NavGroup
              icon={ClipboardCheck}
              label="Auditorias"
              defaultOpen
              children={[
                { to: "/auditorias", icon: ClipboardCheck, label: "Executar" },
                { to: "/checklists", icon: ListChecks, label: "Checklists" },
                { to: "/planos-acao", icon: ClipboardList, label: "Planos de Ação" },
                { to: "/agendamentos", icon: Calendar, label: "Agendamentos" },
                { to: "/historico", icon: History, label: "Histórico" },
              ]}
            />

            <NavGroup
              icon={Package}
              label="Gestão de Ativos"
              children={[
                { to: "/bens-equipamentos", icon: Package, label: "Bens & Equipamentos" },
                { to: "/selecionar-ativo", icon: Package, label: "Selecionar Ativo" },
                { to: "/manutencoes", icon: Wrench, label: "Manutenções" },
              ]}
            />

            <NavItem to="/avisos" icon={Bell} label="Avisos" />
            
            <NavGroup
              icon={Users}
              label="Usuários"
              children={[
                { to: "/usuarios", icon: Users, label: "Lista" },
                { to: "/registro-ponto", icon: Clock, label: "Registro de Ponto" },
                { to: "/usuarios/permissoes", icon: Settings, label: "Permissões" },
              ]}
            />

            <NavItem to="/filiais" icon={Building2} label="Filiais" />
            <NavItem to="/configuracoes" icon={Settings} label="Configurações" />
          </div>
        )}
      </nav>

      {/* User Section */}
      <div className={cn(
        "border-t border-sidebar-border p-3",
        collapsed ? "flex justify-center" : ""
      )}>
        {collapsed ? (
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
              R
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                R
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Rafael</p>
              <p className="text-xs text-sidebar-muted truncate">rafael@rlsystem.com.br</p>
            </div>
            <button className="p-1.5 rounded-md text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
