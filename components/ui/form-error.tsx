interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  
  return (
    <p className="text-sm text-red-500 mt-1">
      {message}
    </p>
  );
}; 