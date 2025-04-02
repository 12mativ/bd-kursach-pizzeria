"use client";

import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { IWorkplaceInfo } from "./workplace-card";

export const DeleteButton = ({ workplace }: { workplace: IWorkplaceInfo }) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="bg-neutral-700 hover:bg-rose-600 cursor-pointer"
      onClick={() => onOpen("deleteWorkplace", { workplaceData: workplace })}
    >
      Удалить
    </Button>
  );
}; 