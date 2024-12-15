"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function TelegramIcon() {
  const { resolvedTheme } = useTheme();

  return resolvedTheme === "light" ? (
    <Image
      src="/assets/icons/telegram-light.svg"
      alt="Telegram Icon"
      className="w-full"
      width={160}
      height={160}
      priority
    />
  ) : (
    <Image
      src="/assets/icons/telegram-dark.svg"
      alt="Telegram Icon"
      className="w-full"
      width={160}
      height={160}
      priority
    />
  );
}
