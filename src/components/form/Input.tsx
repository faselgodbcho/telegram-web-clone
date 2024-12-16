import { cn } from "@/lib/utils";

export default function Input(props: InputProps) {
  return <input {...props} className={cn("tg-input", props.className)} />;
}
