import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { auth } from "./slices/authSlice";
import { RouterProvider } from "react-router-dom";
import { Loader } from "./components/Loader";
import { router } from "./router";

function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  return (
    <>
      {status === "loading" || status === "idle" ? (
        <Loader />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
