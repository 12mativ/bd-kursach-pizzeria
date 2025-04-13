"use client";

import { useEffect, useState } from "react";
import { CreateEmployeeModal } from "../modals/create-employee";
import { EditEmployeeModal } from "../modals/edit-employee";
import { DeleteEmployeeModal } from "../modals/delete-employee";
import { EditWorkplaceModal } from "../modals/edit-workplace";
import { CreateWorkplaceModal } from "../modals/create-workplace";
import { DeleteWorkplaceModal } from "../modals/delete-workplace";
import { AddEmployeeToWorkplaceModal } from "../modals/add-employee-to-workplace";
import { CreatePizzaModal } from "../modals/create-pizza";
import { EditPizzaModal } from "../modals/edit-pizza";
import { DeletePizzaModal } from "../modals/delete-pizza";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateEmployeeModal />
      <EditEmployeeModal />
      <DeleteEmployeeModal />
      <CreateWorkplaceModal />
      <EditWorkplaceModal />
      <DeleteWorkplaceModal />
      <AddEmployeeToWorkplaceModal />
      <CreatePizzaModal />
      <EditPizzaModal />
      <DeletePizzaModal />
    </>
  );
}
