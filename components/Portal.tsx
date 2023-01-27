import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: React.PropsWithChildren<any>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#__next") as Element)
    : null;
};

export default Portal;
