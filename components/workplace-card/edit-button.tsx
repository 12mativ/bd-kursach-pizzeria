"use client";

import { Edit, Edit2 } from "lucide-react";
import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { IWorkplaceInfo } from "./workplace-card";

export const EditButton = ({ workplace }: { workplace: IWorkplaceInfo }) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
      onClick={() => onOpen("editWorkplace", { workplaceData: workplace })}
    >
      <p>Редактировать</p>
      <Edit className="w-4 h-4" />
    </Button>
  );
}; 