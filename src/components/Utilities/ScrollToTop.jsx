import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-3 right-3 md:bottom-8 flex items-center justify-center md:right-8 z-50 p-2 md:p-3 bg-violet-500 hover:bg-violet-600 text-white rounded-full shadow-lg transition-all duration-1000 hover:scale-110 hover:-rotate-90"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp className="md:text-lg" />
                </button>
            )}
        </>
    );
}

export default ScrollToTop;
