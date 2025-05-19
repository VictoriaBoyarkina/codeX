import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "@/assets/404.svg";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-muted text-center">
      <motion.img
        src={NotFoundImage}
        alt="404 illustration"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-64 h-64 mb-8"
      />

      <motion.h1
        className="text-4xl font-bold mb-2 text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        404 – Страница не найдена
      </motion.h1>

      <motion.p
        className="text-muted-foreground mb-6 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Упс! Похоже, вы попали не туда. Страница, которую вы ищете, не
        существует или была удалена.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button onClick={() => navigate("/")} className="text-base px-6 py-2">
          На главную
        </Button>
      </motion.div>
    </div>
  );
}
