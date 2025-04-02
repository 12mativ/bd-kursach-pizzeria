"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const CreateWorkplaceButton = () => {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("createWorkplace")}
      className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer w-fit"
    >
      Добавить рабочее место +
    </Button>
  );
};
