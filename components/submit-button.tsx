"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer">
      {text}
    </Button>
  );
};
