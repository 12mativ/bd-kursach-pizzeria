import { Button } from "../ui/button"
import { EditButton } from "./edit-button"

export interface IEmployeeInfo {
  id: number,
  name: string,
  surname: string,
  patronymic: string,
  phone: string
}

export const EmployeeCard = ({employee}: {employee: IEmployeeInfo}) => {
  return (
    <div className="flex flex-col gap-y-2 border border-neutral-700 p-2 rounded w-[300px] bg-neutral-800">
      <p className="text-indigo-400">{employee.surname} {employee.name} {employee.patronymic}</p>
      <p>{employee.phone}</p>
      <div className="flex items-center gap-x-2 mt-2">
        <EditButton employee={employee} />
        <Button className="bg-neutral-700 hover:bg-rose-600 cursor-pointer">Удалить</Button>
      </div>
    </div>
  )
}