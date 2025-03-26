import { Button } from "./ui/button"

export interface IEmployeeInfo {
  id: string,
  name: string,
  surname: string,
  patronymic: string,
  jobPosition: string,
  phone: string
}

export const EmployeeCard = ({employee}: {employee: IEmployeeInfo}) => {
  return (
    <div className="flex flex-col gap-y-2 border border-neutral-700 p-2 rounded w-[300px] bg-neutral-800">
      <p className="text-indigo-400">{employee.surname} {employee.name} {employee.patronymic}</p>
      <p>{employee.phone}</p>
      <p>{employee.jobPosition}</p>
      <div className="flex items-center gap-x-2 mt-2">
        <Button className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer">Редактировать</Button>
        <Button className="bg-neutral-700 hover:bg-rose-600 cursor-pointer">Удалить</Button>
      </div>
    </div>
  )
}