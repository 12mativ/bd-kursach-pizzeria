"use client";

import { Ban, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const ChangeAvaiabilityButton = ({
  productId,
  currentAvailability,
  token,
}: {
  productId: number;
  currentAvailability: boolean;
  token: string;
}) => {
  const router = useRouter();

  const handleChangeAvailabiity = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/available/${productId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ availability: currentAvailability }),
      }
    ).then(() => router.refresh());
  };

  return (
    <Button
      onClick={handleChangeAvailabiity}
      className={cn(
        "flex gap-x-2 items-center cursor-pointer",
        currentAvailability
          ? "bg-red-600 hover:bg-red-500"
          : "bg-green-600 hover:bg-green-500"
      )}
    >
      <p>Изменить доступость</p>
      {currentAvailability ? <Ban /> : <Check />}
    </Button>
  );
};
