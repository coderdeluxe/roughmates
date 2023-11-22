import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDeleteProjectMutation } from "../../../services/api/project-api";
import { ProjectSchema } from "../../../models/project";

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
} from "../../../components/ui/alert-dialog";
import { toast } from "../../../components/ui/toast/use-toast";
import { useState } from "react";

interface Props<TData> {
  row: Row<TData>;
}

export function ProjectDataTableRowActions<TData>({ row }: Props<TData>) {
  const project = ProjectSchema.parse(row.original);

  const [deleteProject] = useDeleteProjectMutation();

  const navigate = useNavigate();
  const gotoDetail = (id: string) => navigate(`/projects/detail/${id}`);
  const gotoEdit = (id: string) => navigate(`/projects/edit/${id}`);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    deleteProject(id);
    setIsDeleteDialogOpen(false);

    deleteProject(id)
      .unwrap()
      .then(() => {
        toast({
          title: "Message",
          description: "Record has been deleted.",
        });
      })
      .catch(() => {
        toast({
          title: "Message",
          description: "Error deleting the record.",
        });
      });
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
            <DropdownMenuItem onClick={() => gotoDetail(project.id)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => gotoEdit(project.id)}>
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
              Are you sure do you want to delete{" "}
              <span className="font-bold">{project.name}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => handleDelete(project.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
