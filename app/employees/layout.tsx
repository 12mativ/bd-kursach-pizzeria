export default function Layout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-yellow-200">
      {children}
    </div>
  )
}