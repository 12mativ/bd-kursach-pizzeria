"use client";

import { IShift } from "../../app/(main)/schedule/page";
import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";

export const AssignShiftButton = ({shifts}: {shifts: IShift[]}) => {
  const {onOpen} = useModal()
  
  return <Button onClick={() => onOpen("assignShift", {shiftsData: shifts})}>Выбрать рабочую смену</Button>;
};
