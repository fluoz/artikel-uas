"use client";

import { useEffect, useState } from "react";
import ModalAuth from "../modal/ModalAuth";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ModalAuth />
    </>
  );
};

export default ModalProvider;
