import Form from "next/form";

type AuthFormProps = {
  type: "sign-in" | "sign-up";
};

export default function AuthForm({ type }: AuthFormProps) {
  return <Form action="">AuthForm</Form>;
}
