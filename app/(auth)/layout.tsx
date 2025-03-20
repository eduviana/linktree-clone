export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
      
        <div className="bg-[url('/bg-login.jpg')] bg-no-repeat bg-cover w-full h-full hidden md:block"/>
      
    </div>
  );
}
