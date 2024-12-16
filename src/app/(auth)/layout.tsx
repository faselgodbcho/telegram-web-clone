import TelegramIcon from "@/components/TelegramIcon";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen select-none">
      <div className="max-w-[360px] w-full mx-auto">
        <div className="max-w-[160px] mx-auto pt-12">
          <TelegramIcon />
        </div>

        {children}
      </div>
    </main>
  );
}
