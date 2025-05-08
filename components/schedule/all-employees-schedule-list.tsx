"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { cn, formatRole } from "@/lib/utils";

interface IEmployeeSchedule {
  assignment_id: number;
  work_date: string;
  start_time: string;
  end_time: string;
  employee_id: number;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  role: string;
}

export const AllEmployeesScheduleList = ({ token }: { token: string }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedules, setSchedules] = useState<IEmployeeSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const getCurrentMonthDates = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return {
      firstDay: firstDay.toISOString().split("T")[0],
      lastDay: lastDay.toISOString().split("T")[0],
    };
  };

  const fetchAllSchedules = async (start: string, end: string) => {
    setIsLoading(true);

    try {
      if (new Date(start) > new Date(end)) {
        throw new Error(
          "Дата начала периода не может быть позже даты окончания"
        );
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee-schedules/period-schedule?start=${start}&end=${end}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при загрузке расписания");
      }

      const data = await response.json();
      setSchedules(data);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Произошла неизвестная ошибка"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("refresh")) {
      url.searchParams.delete("refresh");
      window.history.replaceState({}, "", url.toString());

      const { firstDay, lastDay } = getCurrentMonthDates();
      fetchAllSchedules(firstDay, lastDay);
    }
  }, [searchParams]);

  useEffect(() => {
    const { firstDay, lastDay } = getCurrentMonthDates();
    setStartDate(firstDay);
    setEndDate(lastDay);
    fetchAllSchedules(firstDay, lastDay);
  }, [token]);

  const handleGetSchedule = () => {
    if (!startDate || !endDate) {
      toast.error("Пожалуйста, выберите обе даты");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Дата начала периода не может быть позже даты окончания");
      return;
    }

    fetchAllSchedules(startDate, endDate);
  };

  return (
    <div className="flex flex-col gap-y-4 p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold">Расписание всех сотрудников</h2>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label htmlFor="startDate" className="block mb-1 text-sm font-medium">
            Дата начала периода
          </label>
          <input
            id="startDate"
            type="date"
            className="w-full p-2 rounded bg-neutral-600"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label htmlFor="endDate" className="block mb-1 text-sm font-medium">
            Дата конца периода
          </label>
          <input
            id="endDate"
            type="date"
            className="w-full p-2 rounded bg-neutral-600"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <Button
          onClick={handleGetSchedule}
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {isLoading ? "Загрузка..." : "Обновить"}
        </Button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : schedules.length === 0 ? (
          <p className="text-gray-500">
            Нет данных о расписании за выбранный период
          </p>
        ) : (
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div
                key={schedule.assignment_id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {new Date(schedule.work_date).toLocaleDateString(
                        "ru-RU",
                        {
                          day: "numeric",
                          month: "long",
                          weekday: "short",
                        }
                      )}
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      {schedule.start_time.slice(0, -3)} - {schedule.end_time.slice(0, -3)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                    <div>
                      <p className="text-sm text-gray-400">Сотрудник</p>
                      <p>
                        {schedule.surname} {schedule.name} {schedule.patronymic}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Телефон</p>
                      <p>{schedule.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Роль</p>
                      <p
                        className={cn(
                          schedule.role === "MANAGER"
                            ? "text-green-500"
                            : schedule.role === "PIZZAMAKER"
                            ? "text-amber-500"
                            : "text-fuchsia-400"
                        )}
                      >
                        {formatRole(
                          schedule.role as "MANAGER" | "PIZZAMAKER" | "CASHIER"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
