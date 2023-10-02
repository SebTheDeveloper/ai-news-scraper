import { useState, useEffect } from "react";

export default function useTypewriterEffect(initialText, speed = 5) {
  const [typedAnswer, setTypedAnswer] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < initialText.length) {
      const timeout = setTimeout(() => {
        setTypedAnswer((prevText) => prevText + initialText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, initialText, speed]);

  return { typedAnswer, isTyping };
}
