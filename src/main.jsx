import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import DotsLoaderFullPage from "./ui/DotsLoaderFullPage.jsx";

import "./styles/index.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./ui/ErrorFallBack.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      onReset={() => window.location.replace("/")}
      FallbackComponent={ErrorFallBack}
    >
      <Suspense fallback={<DotsLoaderFullPage />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
