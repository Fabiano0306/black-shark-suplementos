import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner
  position="top-center"
  toastOptions={{
    classNames: {
      toast:
        'bg-[#0a0a0a]/95 border border-[#00ffff]/50 text-white rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.4)] backdrop-blur-md',
      success:
        'text-[#00ffff] font-semibold border-[#00ffff]/70 shadow-[0_0_25px_rgba(0,255,255,0.6)]',
      error:
        'text-[#ff4d4d] font-semibold border-[#ff4d4d]/70 shadow-[0_0_25px_rgba(255,77,77,0.6)]',
      info:
        'text-[#0077ff] font-semibold border-[#0077ff]/70 shadow-[0_0_25px_rgba(0,119,255,0.6)]',
    },
    duration: 3000, // 3 segundos padrão
  }}
/>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
