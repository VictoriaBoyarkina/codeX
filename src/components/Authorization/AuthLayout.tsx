import { useAppSelector } from "@/store";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex bg-test w-screen min-h-screen overflow-y-auto">
      <div className="hidden md:flex justify-center items-center w-5/12 lg:w-6/12  bg-gradient-image">
        <div className="size-70 lg:size-100 xl:size-120 rounded-[50%] bg-sphere"></div>
      </div>
      <div className="flex bg-gradient-image md:!bg-none w-full md:w-7/12 lg:w-6/12 justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
