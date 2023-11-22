import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDeleteTaskMutation } from "../../../../services/api/task-api";
import { TaskSchema } from "../../../../models/task";

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
} from "../../../../components/ui/alert-dialog";
import { toast } from "../../../../components/ui/toast/use-toast";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = TaskSchema.parse(row.original);

  const [deleteTask] = useDeleteTaskMutation();

  const navigate = useNavigate();
  const gotoDetail = (id: string) => navigate(`/tasks/detail/${id}`);
  const gotoEdit = (id: string) => navigate(`/tasks/edit/${id}`);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    deleteTask(id);
    setIsDeleteDialogOpen(false);


    try {
      deleteTask(id);
      toast({
        title: "Message",
        description: "Record has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Message",
        description: "Error deleting the record.",
      });
    }
  };

  return (
    <>
      <AlertDialog open={isDeleteDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted float-right"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => gotoDetail(task.id)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => gotoEdit(task.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure do you want to delete <span className="font-bold">{task.code}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
