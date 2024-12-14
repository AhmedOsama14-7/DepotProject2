import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(false);
  const checkScrollPosition = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);
  return (
    <div className="topArrowDiv">
   {
        isVisible &&
        <div className="topArrow" onClick={scrollToTop}>
        <IoIosArrowUp />
        </div>
    }
    </div>
  );
}
