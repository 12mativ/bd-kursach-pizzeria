interface EmployeeInfo {
  id: string,
  name: string,
  surname: string,
  patronymic: string,
  jobPosition: string,
  phone: string
}

export const EmployeeCard = ({employee}: {employee: EmployeeInfo}) => {
  return (
    <div className="border p-2 rounded">
      <p>{employee.surname} {employee.name} {employee.patronymic}</p>
      <p>{employee.phone}</p>
      <p>{employee.jobPosition}</p>
    </div>
  )
}