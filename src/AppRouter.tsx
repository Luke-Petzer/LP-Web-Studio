import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Portfolio } from './pages/Portfolio';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';
import { ShowcaseProject } from './pages/ShowcaseProject';
import { DesignConcept } from './pages/DesignConcept';
import { PageTransition } from './components/PageTransition';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
// import { PerformanceMonitor } from './components/PerformanceMonitor' // Temporarily disabled

export function AppRouter() {
  return <BrowserRouter>
      <ScrollToTop />
      {/* PerformanceMonitor temporarily disabled for development */}
      {/* <PerformanceMonitor /> */}
      {/* Fixed header outside of transition */}
      <Header />
      <div className="page-container">
        <PageTransition>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/showcase/:id" element={<ShowcaseProject />} />
            <Route path="/design/:id" element={<DesignConcept />} />
          </Routes>
        </PageTransition>
      </div>
      {/* Fixed footer outside of transition */}
      <Footer />
    </BrowserRouter>;
}