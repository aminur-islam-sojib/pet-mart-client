import { useEffect } from "react";

const useDynamicTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | PawMart`;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default useDynamicTitle;
