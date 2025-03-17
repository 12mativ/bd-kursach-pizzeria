import { EmployeeCard } from "@/components/employee-card";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { JobCard } from "../../components/job-card";

export default function Page() {
  var jobs = [
    {
      id: "1",
      name: "Печь",
      workers: [{id: "1", name: "Иванов"}, {id: "2", name: "Петров"}],
    },
    {
      id: "2",
      name: "Разделочный стол",
      workers: [{id: "1", name: "Сергеева"}],
    },
    {
      id: "3",
      name: "Посудомоечная раковина",
      workers: [{id: "1", name: "Иванов"}, {id: "2", name: "Федоров"}],
    },
  ];
  return (
    <div className="flex flex-col gap-y-3 m-3">
      <Button className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer w-fit">Добавить рабочее место +  </Button>
      <div className="flex gap-3 flex-wrap">
        {jobs.map((j) => (
          <JobCard job={j} key={j.id} />
        ))}
      </div>
    </div>
  );
}
