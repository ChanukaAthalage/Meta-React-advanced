import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  { icon: faEnvelope, url: "mailto:hello@example.com" },
  { icon: faGithub, url: "https://github.com" },
  { icon: faLinkedin, url: "https://www.linkedin.com" },
  { icon: faMedium, url: "https://medium.com" },
  { icon: faStackOverflow, url: "https://stackoverflow.com" },
];

const Header = () => {
  const headerRef = useRef(null);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // keep URL in sync with the section
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  // Bonus: slide header up/down based on scroll direction
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currY = window.scrollY;
      if (!headerRef.current) return;
      headerRef.current.style.transform =
        currY > lastY ? "translateY(-200px)" : "translateY(0)";
      lastY = currY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      zIndex={1000}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack px={16} py={4} justifyContent="space-between" alignItems="center">
          {/* Left: Socials */}
          <nav>
            <HStack spacing={6}>
              {socials.map(({ icon, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={url}
                >
                  <FontAwesomeIcon icon={icon} size="2x" />
                </a>
              ))}
            </HStack>
          </nav>

          {/* Right: Internal links */}
          <nav>
            <HStack spacing={8}>
              <a href="#projects-section" onClick={(e) => { e.preventDefault(); handleClick("projects")(); }}>
                Projects
              </a>
              <a href="#contactme-section" onClick={(e) => { e.preventDefault(); handleClick("contactme")(); }}>
                Contact Me
              </a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
