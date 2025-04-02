import Link from "next/link"

export const Header = () => {
  var menuItems = [
    {id: 1, name: "Главная", href: "/"},
    {id: 2, name: "Сотрудники", href: "/employees"},
    {id: 3, name: "Рабочие места", href: "/workplaces"}
  ]

  return (
    <div className="p-3 bg-neutral-800">
      <nav className="flex items-center gap-x-3">
        {menuItems.map((mI) => (
          <Link key={mI.id} href={mI.href} className="hover:text-indigo-400 hover:bg-neutral-700 transition p-2 rounded">{mI.name}</Link>
        ))}
      </nav>
    </div>
  )
}