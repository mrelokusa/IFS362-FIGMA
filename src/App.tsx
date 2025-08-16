import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { InformationalSections } from "./components/InformationalSections";
import { InteractiveFeatures } from "./components/InteractiveFeatures";
import { InteractiveGames } from "./components/InteractiveGames";
import { Footer } from "./components/Footer";
import { ChatBot } from "./components/ChatBot";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <InformationalSections />
      <InteractiveFeatures />
      <div id="games">
        <InteractiveGames />
      </div>
      <Footer />
      <ChatBot />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
