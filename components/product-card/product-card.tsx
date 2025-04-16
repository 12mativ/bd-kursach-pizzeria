import { verifySession } from "@/lib/dal";
import Image from "next/image";
import { AddToCartButton } from "./add-to-cart-button";
import { DeleteButton } from "./delete-button";
import { EditButton } from "./edit-button";
export interface IProductInfo {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  imageUrl: string;
  productType: "PIZZA" | "DRINK"
  quantity: number;
}

export const ProductCard = async ({ product }: { product: IProductInfo }) => {
  const {role} = await verifySession();
  
  return (
    <div className="flex flex-col gap-y-2 border border-neutral-700 p-2 rounded w-[300px] bg-neutral-800">
      {product.imageUrl && (
        <Image
          src={`${process.env.BACKEND_URL}${product.imageUrl}`}
          alt={product.name}
          width={300}
          height={300}
        />
      )}
      <p className="text-indigo-400 text-xl font-bold">{product.name}</p>
      <p className="text-neutral-300 text-sm line-clamp-3 flex-grow">{product.description}</p>
      <p className="font-semibold">
        от {product.price} ₽
      </p>
      <div className="flex items-center gap-x-2 mt-2">
        {role === "ADMIN" && <EditButton product={product} />}
        {role === "ADMIN" && <DeleteButton product={product} />}
        {role === "CLIENT" && <AddToCartButton product={product} />}
      </div>
    </div>
  );
};
