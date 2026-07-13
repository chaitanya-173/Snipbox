import { useTheme } from "../context/ThemeContext";

// Shows the dark-mode screenshot by default, crossfading to the light-mode
// one when the visitor toggles the theme — so the landing page itself
// demonstrates the real dark/light switch using real product screenshots.
export default function ThemeSwapImage({ darkSrc, lightSrc, alt, className = "" }) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={darkSrc} alt={alt} className="block w-full h-full object-cover object-top" />
      <img
        src={lightSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover object-top
                   transition-opacity duration-500 ease-out
                   ${isDarkMode ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
}