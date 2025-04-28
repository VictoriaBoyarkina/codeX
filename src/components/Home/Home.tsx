import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/store";
import { useState } from "react";
import { logout } from "@/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await dispatch(logout()).unwrap();

      navigate("/auth/login");
    } catch {
      toast.error("Не удалось выйти. Попробуйте ещё раз");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-muted px-4 py-10">
      <h1 className="text-4xl font-bold text-foreground mb-6">
        Добро пожаловать 👋
      </h1>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Главная страница</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 ">
            Это простая домашняя страница.
          </p>

          <Button loading={isLoading} className="w-full" onClick={handleLogout}>
            Выйти
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
