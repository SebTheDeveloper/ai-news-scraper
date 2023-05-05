import { useState, useEffect } from 'react';

export default function useTypewriterEffect(initialText, speed = 10) {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < initialText.length) {
      const timeout = setTimeout(() => {
        setText((prevText) => prevText + initialText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, initialText, speed]);

  return text;
}
