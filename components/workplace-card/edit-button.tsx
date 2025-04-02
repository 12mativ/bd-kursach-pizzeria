"use client";

import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { IWorkplaceInfo } from "./workplace-card";

export const EditButton = ({ workplace }: { workplace: IWorkplaceInfo }) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
      onClick={() => onOpen("editWorkplace", { workplaceData: workplace })}
    >
      Редактировать
    </Button>
  );
}; 