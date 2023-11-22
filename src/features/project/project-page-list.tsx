import { columns } from "./components/project-data-table-columns";
import { ProjectDataTable } from "./components/project-data-table";
import { useGetProjectsQuery } from "../../services/api/project-api";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function ProjectPageList() {
  const { data } = useGetProjectsQuery();

  const navigate = useNavigate();
  const gotoCreate = () => navigate("/projects/create");

  return (
    <>
      <div className="py-8">
        <div className="grid gap-3 md:flex md:justify-between md:items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Projects
          </h2>
          <div>
            <div className="inline-flex gap-x-2">
              <Button onClick={gotoCreate}>Create</Button>
            </div>
          </div>
        </div>
      </div>

      <ProjectDataTable data={data ?? []} columns={columns} />
    </>
  );
}
