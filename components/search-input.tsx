// components/ui/search-input.tsx
"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchInput({
  placeholder,
  defaultValue = "",
}: {
  placeholder: string;
  defaultValue?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedValue) {
      router.push(`/orders?search=${debouncedValue}`);
    } else {
      router.push("/orders");
    }
  }, [debouncedValue, router]);

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  );
}