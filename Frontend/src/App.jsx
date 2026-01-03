import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/layout/Footer";
import ChatBot from "@/components/ChatBot";
import { ThemeProvider } from "@/context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />
        <ChatBot />
      </div>
    </ThemeProvider>
  );
}

export default App;
