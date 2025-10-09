import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Typography } from "@/components/ui/typography";
import { Plus } from "lucide-react";
import { CreateForm } from "./createForm";
import { PostType } from "@/entities/posts/types";

export function CreateModal() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-[200px] flex gap-x-2">
            <Plus />
            <Typography text="Новый пост" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <Typography text="Новый пост" />
            </DialogTitle>
          </DialogHeader>
          <CreateForm formType={PostType.Vacancy} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
