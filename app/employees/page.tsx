import { EmployeeCard } from "@/components/employee-card";
import Link from "next/link";

export default function Page() {
  var employees = [
    {
      id: "1",
      name: "Иван",
      surname: "Матюхин",
      patronymic: "Станиславович",
      jobPosition: "Пицца-мейкер",
      phone: "123123",
    }
  ]
  return (
    <div>
      <Link href="/">На главную</Link>
      {employees.map((e) => (
        <EmployeeCard employee={e} key={e.id} />
      ))}
    </div>
  )
}