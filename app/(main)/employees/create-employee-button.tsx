"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const CreateEmployeeButton = () => {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("createEmployee")}
      className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer w-fit"
    >
      Добавить сотрудника +
    </Button>
  );
};
