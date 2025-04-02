import { create } from "zustand";
import { IEmployeeInfo } from "../components/employee-card/employee-card";

export type ModalType = "createEmployee" | "editEmployee" | "deleteEmployee";

export interface ModalData {
  employeeData?: IEmployeeInfo,
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
