import Button from "./Button";

function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-4xl font-medium">Something went wrong 🥲</h1>
        <p className="text-lg">{error.message}</p>

        <div>
          <Button onClick={resetErrorBoundary}>Tyr again</Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallBack;
