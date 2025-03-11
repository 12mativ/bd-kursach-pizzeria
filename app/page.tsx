import Image from "next/image";
import Link from "next/link";

export default function Home() {
  var menuItems = [
    {id: 1, name: "Сотрудники", href: "/employees"}
  ]
  
  return (
    <div>
      <nav>
        {menuItems.map((mI) => (
          <Link key={mI.id} href={mI.href}>{mI.name}</Link>
        ))}
      </nav>
    </div>
  );
}
