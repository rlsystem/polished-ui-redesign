import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
              <Building2 className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              Sistema de Gestão
            </h1>
            <p className="text-sm text-muted-foreground">
              Faça login para continuar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm">Senha</Label>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                Manter conectado
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-10"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            Problemas para acessar?{" "}
            <button className="text-primary hover:underline">
              Contate o suporte
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 bg-primary">
        <div className="max-w-md text-center text-primary-foreground space-y-6">
          <Building2 className="h-12 w-12 mx-auto opacity-90" />
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
              Gestão Completa e Integrada
            </h2>
            <p className="text-sm opacity-80 leading-relaxed">
              Auditorias, manutenções, planos de ação e muito mais em um só lugar.
              Controle total das operações da sua empresa.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-lg bg-primary-foreground/10">
              <div className="text-2xl font-bold">1.2k+</div>
              <div className="text-xs opacity-70">Auditorias</div>
            </div>
            <div className="p-4 rounded-lg bg-primary-foreground/10">
              <div className="text-2xl font-bold">350+</div>
              <div className="text-xs opacity-70">Manutenções</div>
            </div>
            <div className="p-4 rounded-lg bg-primary-foreground/10">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-xs opacity-70">Conformidade</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
