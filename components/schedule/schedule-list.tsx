"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

interface IScheduleItem {
  id: number;
  work_date: string;
  start_time: string;
  end_time: string;
}

export const ScheduleList = ({
  employeeId,
  token,
}: {
  employeeId: string;
  token: string;
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scheduleList, setScheduleList] = useState<IScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams()

  const getCurrentMonthDates = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    return {
      firstDay: firstDay.toISOString().split('T')[0],
      lastDay: lastDay.toISOString().split('T')[0]
    };
  };

  const fetchSchedule = async (start: string, end: string) => {
    setIsLoading(true);
    
    try {
      if (new Date(start) > new Date(end)) {
        throw new Error('Дата начала периода не может быть позже даты окончания');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee-schedules/employee/${employeeId}?start=${start}&end=${end}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка при загрузке расписания');
      }

      const data = await response.json();
      setScheduleList(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('refresh')) {
      // Убираем параметр из URL
      url.searchParams.delete('refresh');
      window.history.replaceState({}, '', url.toString());
      
      // Обновляем данные
      const { firstDay, lastDay } = getCurrentMonthDates();
      fetchSchedule(firstDay, lastDay);
    }
  }, [searchParams]);

  useEffect(() => {
    const { firstDay, lastDay } = getCurrentMonthDates();
    setStartDate(firstDay);
    setEndDate(lastDay);
    fetchSchedule(firstDay, lastDay);
  }, [employeeId, token]);

  const handleGetSchedule = () => {
    if (!startDate || !endDate) {
      toast.error('Пожалуйста, выберите обе даты');
      return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Дата начала периода не может быть позже даты окончания');
      return;
    }

    fetchSchedule(startDate, endDate);
  };

  return (
    <div className="flex flex-col gap-y-4 p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Расписание сотрудника</h2>
      
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
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
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
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        
        <Button
          onClick={handleGetSchedule}
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {isLoading ? 'Загрузка...' : 'Обновить'}
        </Button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : scheduleList.length === 0 ? (
          <p className="text-gray-500">Нет данных о расписании за выбранный период</p>
        ) : (
          <div className="space-y-4">
            {scheduleList.map((item) => (
              <div 
                key={item.id} 
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {new Date(item.work_date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      weekday: 'short'
                    })}
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {item.start_time.slice(0, -3)} - {item.end_time.slice(0, -3)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};