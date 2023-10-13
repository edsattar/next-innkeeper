"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/alert-dialog";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  deleteAction: (id: number) => void;
}

const DeleteConfirmDialog = ({ id, deleteAction }: Props) => {
  const router = useRouter();

  const onConfirm = () => {
    try {
      deleteAction(id);
      // router.refresh();
      router.push("/staff/reservations");
    } catch (error: any) {
      console.log(error);
      toast({ title: "Something went wrong.", description: error.message });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-[48px] sm:w-[100px]">
          <span className="hidden sm:inline">Delete</span>
          <TrashIcon width={20} className="sm:hidden" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteConfirmDialog;
