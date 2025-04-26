import { FC } from "react";
import { CardContent, CardHeader, CardNoBorders, CardTitle } from "../ui/card";

import { LoginForm } from "@/forms/Login";

const Login: FC = () => {
  return (
    <CardNoBorders className="w-10/12 sm:w-11/12 max-w-[450px] lg:max-w-[550px] h-fit bg-white md:bg-none">
      <CardHeader>
        <CardTitle className="text-xl">Вход в систему</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </CardNoBorders>
  );
};

export default Login;
