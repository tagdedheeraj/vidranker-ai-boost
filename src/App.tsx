
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Header } from "./components/Header";
import { BottomNavigation } from "./components/BottomNavigation";
import Home from "./pages/Home";
import SEOGenerator from "./pages/SEOGenerator";
import ThumbnailGenerator from "./pages/ThumbnailGenerator";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/seo" element={<SEOGenerator />} />
                <Route path="/thumbnail" element={<ThumbnailGenerator />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <BottomNavigation />
          </BrowserRouter>
        </div>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
