import { verifySession } from "@/lib/dal";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AssignShiftButton } from "../../../components/schedule/assign-shift-button";
import { Button } from "../../../components/ui/button";
import { ScheduleList } from "@/components/schedule/schedule-list";
import { AllEmployeesScheduleList } from "@/components/schedule/all-employees-schedule-list";

export interface IShift {
  id: number;
  start_time: string;
  end_time: string;
}

export default async function Cart() {
  const { isAuth, role } = await verifySession();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userInfo = token
    ? jwtDecode<{ role: string; clientId: string; employeeId: string }>(token)
    : null;

  if (!isAuth) {
    redirect("/auth");
  }

  var data = await fetchWithAuth(
    `${process.env.BACKEND_URL}/employee-schedules/shifts`
  );
  var shifts = await data.json();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">Расписание</h1>
        {role !== "ADMIN" && <AssignShiftButton shifts={shifts} employeeId={userInfo!.employeeId} />}
      </div>

      {role !== "ADMIN" && (
        <ScheduleList employeeId={userInfo!.employeeId} token={token!} />
      )}

      {role === "ADMIN" && (
        <AllEmployeesScheduleList token={token!} />
      )}
    </div>
  );
}
