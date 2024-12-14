export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen select-none min-[1450px]:flex items-center justify-center">
      <div className="max-w-[360px] w-full mx-auto">
        {/* TODO: place static image here. */}
      </div>

      {children}
    </main>
  );
}
