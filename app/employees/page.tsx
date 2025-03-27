import { EmployeeCard, IEmployeeInfo } from "@/components/employee-card";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Suspense } from "react";

export default async function Page() {
  var employees = [
    {
      id: "1",
      name: "Иван",
      surname: "Матюхин",
      patronymic: "Станиславович",
      jobPosition: "Пицца-мейкер",
      phone: "123123",
    },
    {
      id: "2",
      name: "Иван",
      surname: "Матюхин",
      patronymic: "Станиславович",
      jobPosition: "Пицца-мейкер",
      phone: "123123",
    },
    {
      id: "3",
      name: "Иван",
      surname: "Матюхин",
      patronymic: "Станиславович",
      jobPosition: "Пицца-мейкер",
      phone: "123123",
    },
    {
      id: "4",
      name: "Иван",
      surname: "Матюхин",
      patronymic: "Станиславович",
      jobPosition: "Пицца-мейкер",
      phone: "123123",
    },
    {
      id: "5",
      name: "Иван",
      surname: "Матюхин",
      patronymic: "Станиславович",
      jobPosition: "Пицца-мейкер",
      phone: "123123",
    },
    {
      id: "6",
      name: "Иван",
      surname: "Матюхин",
      patronymic: "Станиславович",
      jobPosition: "Пицца-мейкер",
      phone: "123123",
    },
  ];

  var employeesFromServer: IEmployeeInfo[] = [];
  var data = await fetch(`${process.env.BACKEND_URL}/employees`).then((res) => {
    res.json().then((res) => {
      employeesFromServer = res;
    });
  });

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex flex-col gap-y-3 m-3">
        <Button className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer w-fit">
          Добавить сотрудника +{" "}
        </Button>
        <div className="flex gap-3 flex-wrap">
          {employeesFromServer.map((e) => (
            <EmployeeCard employee={e} key={e.id} />
          ))}
        </div>
      </div>
    </Suspense>
  );
}
