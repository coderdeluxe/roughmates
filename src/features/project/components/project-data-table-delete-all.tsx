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
import { Button } from "../../../components/ui/button";
import { useDeleteProjectMutation } from "../../../services/api/project-api";
import { Table } from "@tanstack/react-table";
import { ProjectSchema } from "../../../models/project";

interface DeleteConfirmationProps<TData> {
  table: Table<TData>;
}

export function ProjectDataTableDeleteAll<TData>({
  table,
}: DeleteConfirmationProps<TData>) {
  const [deleteProject] = useDeleteProjectMutation();

  const selectedRows = table.getSelectedRowModel().rows.map((x) => {
    return ProjectSchema.parse(x.original);
  });

  const handleDelete = () => {
    selectedRows.map((x) => deleteProject(x.id));
  };

  return (
    <>
      <div className="inline-flex gap-x-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="h-8 px-2 lg:px-3">
              Delete
              <span className="ml-2 pl-2 h-4 w-4 text-xs font-semibold border-l border-gray-200 ">
                {" "}
                {table.getSelectedRowModel().rows.length}
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure do you want to delete this record(s)?
              </AlertDialogDescription>

              <AlertDialogDescription className="px-2">
                <span className="list-disc">
                  {selectedRows.map((x, i) => {
                    return (
                      <li key={i}>
                        {x.id} {x.name}
                      </li>
                    );
                  })}
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => handleDelete()}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
