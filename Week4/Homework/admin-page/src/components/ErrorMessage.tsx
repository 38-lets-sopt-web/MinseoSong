interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="error-box">{message}</p>;
}

export default ErrorMessage;
