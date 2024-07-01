import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./contexts/AuthContext";
import Router from "./routes";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Suspense>
          <Router />
          <ToastContainer
            position='bottom-right'
            autoClose={3000}
            hideProgressBar
          />
        </Suspense>
      </AuthContextProvider>
    </>
  );
}

export default App;
