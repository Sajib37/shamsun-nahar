import { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import MobilePreloader from "./components/Utilities/MobilePreloader";
import Preloader from "./components/Utilities/Preloader";
import ScrollToTop from "./components/Utilities/ScrollToTop";
import Navbar from "./components/Navigation/Navbar";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Works from "./components/Works/Works";
import Achievement from "./components/Achievement/Achievement";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Navigation/Footer";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile =
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkMobile();

    // Ultra-fast loading for mobile devices
    const loadTime = mobile ? 500 : 1000;

    const timer = setTimeout(() => {
      setLoading(false);
    }, loadTime);

    const handleResize = () => checkMobile();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const FastFallback = ({ message = "Loading..." }) => (
    <div className="py-4 flex items-center justify-center min-h-[30vh]">
      <div className="text-center">
        <div className="w-4 h-4 border border-slate-600 border-t-blue-400 rounded-full animate-spin mx-auto mb-1"></div>
        <p className="text-slate-500 text-xs">{message}</p>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallbackMessage="Something went wrong. Please refresh the page.">
      <Router>
        <div className="App min-h-screen relative">
          {/* Background gradient overlay */}
          <div className="fixed inset-0">
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700/80 via-purple-700/70 to-gray-950"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/3 to-transparent"></div>
            </div>
          </div>

          <div className="relative z-10 text-slate-100">
            {loading ? (
              isMobile ? (
                <MobilePreloader />
              ) : (
                <Preloader />
              )
            ) : (
              <>
                <Navbar />
                <main className="relative">
                  <ScrollToTop />
                  <ErrorBoundary fallbackMessage="There was an error loading the page content.">
                    <Routes>
                      {/* Main Portfolio Page - Mobile Optimized */}
                      <Route
                        path="/"
                        element={
                          <>
                            
                            
                            
                            <section
                              id="home"
                              fallback={
                                <FastFallback message="Loading home..." />
                              }
                            >
                              <Suspense
                                fallback={
                                  <FastFallback message="Loading home..." />
                                }
                              >
                                <Home/>
                              </Suspense>
                            </section>
                            <section
                              id="about"
                              fallback={
                                <FastFallback message="Loading about..." />
                              }
                            >
                              <Suspense
                                fallback={
                                  <FastFallback message="Loading about..." />
                                }
                              >
                                <About/>
                              </Suspense>
                            </section>
                            <section
                              id="works"
                              fallback={
                                <FastFallback message="Loading works..." />
                              }
                            >
                              <Suspense
                                fallback={
                                  <FastFallback message="Loading works..." />
                                }
                              >
                                <Works/>
                              </Suspense>
                            </section>
                            <section
                              id="achievements"
                              fallback={
                                <FastFallback message="Loading achievements..." />
                              }
                            >
                              <Suspense
                                fallback={
                                  <FastFallback message="Loading achievements..." />
                                }
                              >
                                <Achievement/>
                              </Suspense>
                            </section>
                            <section
                              id="contact"
                              fallback={
                                <FastFallback message="Loading contact..." />
                              }
                            >
                              <Suspense
                                fallback={
                                  <FastFallback message="Loading contact..." />
                                }
                              >
                                <Contact/>
                              </Suspense>
                            </section>
                          </>
                        }
                      />
                    </Routes>
                  </ErrorBoundary>
                </main>
                <Footer />
              </>
            )}
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
