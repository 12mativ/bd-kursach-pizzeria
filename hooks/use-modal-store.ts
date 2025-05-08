import { create } from "zustand";
import { IEmployeeInfo } from "../components/employee-card/employee-card";
import { IWorkplaceInfo } from "@/components/workplace-card/workplace-card";
import { IProductInfo } from "@/components/product-card/product-card";
import { IShift } from "../app/(main)/schedule/page";
export type ModalType =
  | "createEmployee"
  | "editEmployee"
  | "createWorkplace"
  | "editWorkplace"
  | "deleteEmployee"
  | "deleteWorkplace"
  | "addEmployeeToWorkplace"
  | "createProduct"
  | "editProduct"
  | "deleteProduct"
  | "selectProduct"
  | "assignShift"

export interface ModalData {
  employeeData?: IEmployeeInfo,
  workplaceData?: {
    id: number;
    name: string;
    capacity: number;
  },
  workplaceId?: number;
  employees?: IEmployeeInfo[];
  assignedEmployeesData?: IEmployeeInfo[];
  productData?: IProductInfo;
  shiftsData?: IShift[];
  employeeId?: string;
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
