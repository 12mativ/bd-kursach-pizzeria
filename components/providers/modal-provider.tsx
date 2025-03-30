"use client";

import { useEffect, useState } from "react";
import { CreateEmployeeModal } from "../modals/create-employee";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateEmployeeModal />
    </>
  );
}
