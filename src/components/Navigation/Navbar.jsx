import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaLaptopCode,
  FaEnvelope,
  FaCogs,
} from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "about", "works", "achievements", "contact"];
      for (let id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          break;
        }
      }
    };

    const handleKeyPress = (e) => e.key === "Escape" && setIsOpen(false);
    const handleResize = () =>
      window.innerWidth >= 768 && setIsOpen(false);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("resize", handleResize);

    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const scrollToSection = (sectionId) => {
    const scrollAction = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 80,
          behavior: "smooth",
        });
      }
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollAction, 100);
    } else scrollAction();
    setIsOpen(false);
  };

  return (
    <motion.nav
      className={`fixed w-full z-30 transition-all border-b border-transparent duration-500 ${
        scrolled
          ? "glass-effect shadow-xl border-b border-blue-900/30 backdrop-blur-xl"
          : "bg-transparent "
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-20">
          <motion.button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-9 h-9 md:w-12 md:h-12 rounded-b-lg flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "Profile" },
              { id: "works", label: "Works" },
              { id: "achievements", label: "Achievements" },
              { id: "contact", label: "Contact" },
            ].map(({ id, label }) => (
              <NavLink
                key={id}
                label={label}
                active={activeSection === id}
                onClick={() => scrollToSection(id)}
              />
            ))}
          </div>

          {/* Mobile Toggle */}
          <motion.button
            onClick={toggleNavbar}
            className="md:hidden p-3 rounded-xl bg-violet-800/50 border border-slate-700/50 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        className={`fixed inset-0 bg-blue-950/40 backdrop-blur-sm z-40 md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <motion.div
        className="fixed right-4 top-20 w-80 bg-slate-900/95 border border-slate-700/50 rounded-2xl shadow-2xl z-50 md:hidden overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, x: 20, y: -20 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.95,
          x: isOpen ? 0 : 20,
          y: isOpen ? 0 : -20,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30 flex items-center gap-3">
          <div className="w-8 h-8">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Navigation</h3>
            <p className="text-slate-400 text-xs">Jump to any section</p>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {[
            { id: "home", icon: <FaHome />, label: "Home" },
            { id: "about", icon: <FaUser />, label: "Profile" },
            { id: "works", icon: <FaLaptopCode />, label: "Works" },
            { id: "achievements", icon: <FaCogs />, label: "Achievements" },
            { id: "contact", icon: <FaEnvelope />, label: "Contact" },
          ].map(({ id, icon, label }) => (
            <MobileNavLink
              key={id}
              icon={icon}
              label={label}
              onClick={() => scrollToSection(id)}
              active={activeSection === id}
            />
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}

function NavLink({ label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
        active
          ? "text-blue-400 bg-blue-500/20"
          : "text-white  hover:bg-violet-600/10"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
      {active && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-1 bg-blue-500 rounded-full"
          layoutId="navbar-indicator"
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

function MobileNavLink({ icon, label, onClick, active }) {
  return (
    <motion.button
      onClick={onClick}
      className={`group w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-blue-400 border border-blue-500/30"
          : "text-slate-300 hover:bg-slate-800/50 hover:text-blue-300"
      }`}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
          active
            ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
            : "bg-slate-800/50 text-slate-400 group-hover:text-blue-400"
        }`}
      >
        {icon}
      </div>
      <span className="flex-1 text-left">{label}</span>
      {active && <div className="w-2 h-2 bg-blue-400 rounded-full" />}
    </motion.button>
  );
}

export default Navbar;
