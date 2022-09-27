import { useEffect, useRef } from "react";

export const useVerticalScroll = ( cb ) => {
  const callback = useRef(null);

  useEffect(() => { callback.current = cb }, [cb])

  useEffect(() => {
    const handleScroll = () => {
      callback.current && callback.current(window.scrollY || 0);
    }
    document.addEventListener('scroll', handleScroll);
    return () => { document.removeEventListener('scroll', handleScroll) }
  }, [])
} 