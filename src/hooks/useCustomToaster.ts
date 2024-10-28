import { useToast } from "./use-toast";

const useCustomToaster = () => {
  const { toast } = useToast();

  const showToast = (
    title: string,
    description: string,
    className?: string
  ): void => {
    toast({
      title,
      description,
      variant: "destructive",
      className:
        "bg-primary-light/30 text-primary-dark dark:bg-primary-dark/30 backdrop-blur-md border border-white/10 dark:text-white font-medium rounded-lg p-4 shadow-lg" +
        (className || ""),
    });
  };

  return { showToast };
};

export default useCustomToaster;
