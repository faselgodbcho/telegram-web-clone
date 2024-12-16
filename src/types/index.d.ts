type FormTypes = "sign-in" | "sign-up";

type AuthFormProps = {
  type: FormTypes;
};

type InputProps = {
  type: "text" | "password" | "email";
  placeholder?: string;
  className?: string;
};
