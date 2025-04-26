import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchUser } from "./slices/authSlice";
import { Outlet } from "react-router-dom";

import { Loader } from "./components/Loader";

function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>{status === "loading" || status === "idle" ? <Loader /> : <Outlet />}</>
  );
}

export default App;
