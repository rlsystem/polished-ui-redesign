import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Manutencoes from "./pages/Manutencoes";
import Auditorias from "./pages/Auditorias";
import HistoricoAuditorias from "./pages/HistoricoAuditorias";
import Checklists from "./pages/Checklists";
import NovoChecklist from "./pages/NovoChecklist";
import EditarChecklist from "./pages/EditarChecklist";
import PlanosAcao from "./pages/PlanosAcao";
import Avisos from "./pages/Avisos";
import Agendamentos from "./pages/Agendamentos";
import BensEquipamentos from "./pages/BensEquipamentos";
import NovoPatrimonio from "./pages/NovoPatrimonio";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/manutencoes" element={<Manutencoes />} />
          <Route path="/auditorias" element={<Auditorias />} />
          <Route path="/auditorias/historico" element={<HistoricoAuditorias />} />
          <Route path="/checklists" element={<Checklists />} />
          <Route path="/checklists/novo" element={<NovoChecklist />} />
          <Route path="/checklists/:id/editar" element={<EditarChecklist />} />
          <Route path="/planos-acao" element={<PlanosAcao />} />
          <Route path="/avisos" element={<Avisos />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/bens-equipamentos" element={<BensEquipamentos />} />
          <Route path="/bens-equipamentos/novo" element={<NovoPatrimonio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
