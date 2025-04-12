"use client";

import { Trash2 } from "lucide-react";
import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { IWorkplaceInfo } from "./workplace-card";

export const DeleteButton = ({ workplace }: { workplace: IWorkplaceInfo }) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="flex items-center gap-2 bg-neutral-700 hover:bg-rose-600 cursor-pointer"
      onClick={() => onOpen("deleteWorkplace", { workplaceData: workplace })}
    >
      <p>Удалить</p>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}; 