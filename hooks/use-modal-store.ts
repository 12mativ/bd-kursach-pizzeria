import { create } from "zustand";
import { IEmployeeInfo } from "../components/employee-card/employee-card";

export interface IWorkplaceInfo {
  id: string;
  name: string;
  status: "free" | "occupied" | "partly occupied";
}

export type ModalType =
  | "createEmployee"
  | "editEmployee"
  | "createWorkplace"
  | "editWorkplace"
  | "deleteEmployee"
  | "deleteWorkplace" ;

export interface ModalData {
  employeeData?: IEmployeeInfo,
  workplaceData?: IWorkplaceInfo
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
