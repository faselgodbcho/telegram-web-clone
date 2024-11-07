const validateField = (name: string, value: string): string => {
  switch (name) {
    case "username":
      if (!/^[a-zA-Z0-9_.]{3,}$/.test(value)) {
        return "Username must be at least 3 characters long and can include letters, numbers, underscores, and periods.";
      }
      break;

    case "email":
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        return "Please enter a valid email address in the format name@provider.com.";
      }
      break;

    case "password":
      if (value.length < 6) {
        return "Password must be at least 6 characters long.";
      }
      if (!/[A-Za-z]/.test(value)) {
        return "Password must contain at least one letter.";
      }
      if (!/\d/.test(value)) {
        return "Password must contain at least one number.";
      }
      break;

    default:
      return "";
  }
  return "";
};

export default validateField;
