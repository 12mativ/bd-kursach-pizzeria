import Image from "next/image";
import { DeleteButton } from "./delete-button";
import { EditButton } from "./edit-button";
import { isAdmin } from "@/lib/utils";
import { verifySession } from "@/lib/dal";
import { AddToCartButton } from "./add-to-cart-button";
export interface IPizzaInfo {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  imageUrl: string;
}

export const PizzaCard = async ({ pizza }: { pizza: IPizzaInfo }) => {
  const {role} = await verifySession();
  
  return (
    <div className="flex flex-col gap-y-2 border border-neutral-700 p-2 rounded w-[300px] bg-neutral-800">
      {pizza.imageUrl && (
        <Image
          src={`${process.env.BACKEND_URL}${pizza.imageUrl}`}
          alt={pizza.name}
          width={300}
          height={300}
        />
      )}
      <p className="text-indigo-400 text-xl font-bold">{pizza.name}</p>
      <p className="text-neutral-300 text-sm line-clamp-3 flex-grow">{pizza.description}</p>
      <p className="font-semibold">
        от {pizza.price} ₽
      </p>
      <div className="flex items-center gap-x-2 mt-2">
        {role === "ADMIN" && <EditButton pizza={pizza} />}
        {role === "ADMIN" && <DeleteButton pizza={pizza} />}
        {role === "CLIENT" && <AddToCartButton pizza={pizza} />}
      </div>
    </div>
  );
};
