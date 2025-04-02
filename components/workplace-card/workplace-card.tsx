import { DeleteButton } from "./delete-button";
import { EditButton } from "./edit-button";

export interface IWorkplaceInfo {
  id: string;
  name: string;
  status: "free" | "occupied" | "partly occupied";
}

export const WorkplaceCard = ({ workplace }: { workplace: IWorkplaceInfo }) => {
  return (
    <div className="flex flex-col gap-y-2 border border-neutral-700 p-2 rounded w-[300px] bg-neutral-800">
      <p className="text-indigo-400">{workplace.name}</p>
      <p className="text-zinc-400">
        Статус:{" "}
        <span
          className={`font-medium ${
            workplace.status === "free"
              ? "text-green-500"
              : workplace.status === "occupied"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {workplace.status === "free"
            ? "Свободно"
            : workplace.status === "occupied"
            ? "Занято"
            : "Частично занято"}
        </span>
      </p>
      <div className="flex items-center gap-x-2 mt-2">
        <EditButton workplace={workplace} />
        <DeleteButton workplace={workplace} />
      </div>
    </div>
  );
}; 