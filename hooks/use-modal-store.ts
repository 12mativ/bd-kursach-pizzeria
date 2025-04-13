import { create } from "zustand";
import { IEmployeeInfo } from "../components/employee-card/employee-card";
import { IWorkplaceInfo } from "@/components/workplace-card/workplace-card";
import { IPizzaInfo } from "@/components/pizza-card/pizza-card";
export type ModalType =
  | "createEmployee"
  | "editEmployee"
  | "createWorkplace"
  | "editWorkplace"
  | "deleteEmployee"
  | "deleteWorkplace"
  | "addEmployeeToWorkplace"
  | "createPizza"
  | "editPizza"
  | "deletePizza"
  | "selectPizza";

export interface ModalData {
  employeeData?: IEmployeeInfo,
  workplaceData?: IWorkplaceInfo,
  workplaceId?: number;
  employees?: IEmployeeInfo[];
  assignedEmployeesData?: IEmployeeInfo[];
  pizzaData?: IPizzaInfo;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => {
  return {
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
  };
});
