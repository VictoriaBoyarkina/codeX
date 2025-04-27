import { FC, useState } from "react";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardNoBorders,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { SignUpForm } from "@/forms/Signup";
import { LoginForm } from "@/forms/Login";

const Authorization: FC = () => {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex justify-center items-center w-3/5 h-full bg-gradient-image">
        <div className="size-100 rounded-[50%] bg-sphere"></div>
      </div>
      <div className="flex justify-center pt-14 w-3/5">
        <CardNoBorders className="w-3/4 max-w-[450px]">
          <CardHeader>
            <CardTitle className="text-xl">
              {isSignup ? "Регистрация" : "Вход в систему"}
            </CardTitle>
          </CardHeader>
          <CardContent>{isSignup ? <SignUpForm /> : <LoginForm />}</CardContent>
          <CardFooter className="flex-col items-start gap-y-2">
            <Button variant="light" size="lg" className="rounded-[50px]">
              {isSignup ? "Регистрация" : "Войти"}
            </Button>
            <div className="text-xs">
              <span>{isSignup ? "Уже есть аккаунт?" : "Нет аккаунта?"}</span>
              &nbsp;
              <a
                href="#"
                className="underline font-medium"
                onClick={() => setIsSignup((isSignup) => !isSignup)}
              >
                {isSignup ? "Войти" : "Зарегистрироваться"}
              </a>
            </div>
          </CardFooter>
        </CardNoBorders>
      </div>
    </div>
  );
};

export default Authorization;
