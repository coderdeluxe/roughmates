import { columns } from "./components/list/columns";
import { DataTable } from "./components/list/data-table";
import { useGetTasksQuery } from "../../services/api/task-api";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function TasksListPage() {
  const { data } = useGetTasksQuery();

  const navigate = useNavigate();
  const gotoCreate = () => navigate("/tasks/create");

  return (
    <>
      <div className="py-8">
        <div className="grid gap-3 md:flex md:justify-between md:items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Task
          </h2>
          <div>
            <div className="inline-flex gap-x-2">
              <Button onClick={gotoCreate}>Create</Button>
            </div>
          </div>
        </div>
      </div>

      <DataTable data={data ?? []} columns={columns} />
    </>
  );
}
