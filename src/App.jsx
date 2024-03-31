import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SkeletonTheme } from "react-loading-skeleton";

import ProductPage from "./pages/ProductPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AppLayout from "./ui/AppLayout";
import PageNotFount from "./pages/PageNotFount";
import ProductsPage from "./pages/ProductsPage";
import AppProvider from "./context/AppContext";
import StaysPage from "./pages/StaysPage";
import AuthenticatedRout from "./features/stays/AuthenticatedRout";

import "./services/i18next";
import AccountPage from "./pages/AccountPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <SkeletonTheme
        baseColor="var(--color-grey-200)"
        highlightColor="var(--color-grey-100)"
      >
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <AppProvider>
                  <AppLayout />
                </AppProvider>
              }
            >
              <Route
                index
                element={<Navigate replace to="products/cabins"></Navigate>}
              />
              <Route path="products/:productType" element={<ProductsPage />} />
              <Route
                path="products/:productType/:productId"
                element={<ProductPage />}
              />
              <Route
                path="/book/:productType/:productId"
                element={<BookingPage />}
              />
              <Route
                path="/stays"
                element={
                  <AuthenticatedRout>
                    <StaysPage />
                  </AuthenticatedRout>
                }
              />

              <Route path="/account" element={<AccountPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<PageNotFount />} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </QueryClientProvider>
  );
}

export default App;
