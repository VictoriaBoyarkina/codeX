import { FC, useState } from "react";
import { CardContent, CardHeader, CardNoBorders, CardTitle } from "../ui/card";
import { SignUpForm } from "@/forms/Signup";
import { LoginForm } from "@/forms/Login";

const Authorization: FC = () => {
  const [isSignup, setIsSignup] = useState(true);

  const login = () => setIsSignup(false);
  const signup = () => setIsSignup(true);

  return (
    <div className="flex bg-test w-screen min-h-screen overflow-y-auto">
      <div className="hidden md:flex justify-center items-center w-5/12 lg:w-6/12  bg-gradient-image">
        <div className="size-70 lg:size-100 xl:size-120 rounded-[50%] bg-sphere"></div>
      </div>
      <div className="flex bg-gradient-image md:!bg-none w-full md:w-7/12 lg:w-6/12 justify-center items-center">
        <CardNoBorders className="w-10/12 sm:w-11/12 max-w-[450px] lg:max-w-[550px] h-fit bg-white md:bg-none">
          <CardHeader>
            <CardTitle className="text-xl">
              {isSignup ? "Регистрация" : "Вход в систему"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSignup ? (
              <SignUpForm onLogin={login} />
            ) : (
              <LoginForm onSignup={signup} />
            )}
          </CardContent>
        </CardNoBorders>
      </div>
    </div>
  );
};

export default Authorization;
