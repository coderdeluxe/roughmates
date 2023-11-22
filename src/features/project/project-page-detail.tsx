import { useParams } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useGetProjectQuery } from "../../services/api/project-api";
import { GoBack } from "../../components/ui/go-back";
import { format, parseISO } from "date-fns";

export const ProjectPageDetail = () => {
  const { id }: any = useParams();

  const { data: project, isLoading } = useGetProjectQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      <div>
        <GoBack to="/projects" />
        <div className="pb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Project Detail
          </h2>
        </div>
      </div>
      <div>
        <Tabs defaultValue="information" className="w-full">
          <TabsList>
            <TabsTrigger value="information">Information</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
          </TabsList>
          <TabsContent value="information">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-2 md:px-5 dark:bg-gray-800 dark:border-gray-700">
                <p className="font-bold text-gray-800 dark:text-white">
                  Information
                </p>
              </div>
              <div className="p-4 md:p-5">
                <div className="">
                  <div className="flex flex-col">
                    <div className="py-1">
                      <div className="text-sm">Name</div>
                      <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                        {project?.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="py-1">
                      <div className="text-sm">Description</div>
                      <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                        {project?.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="audit">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-2 md:px-5 dark:bg-gray-800 dark:border-gray-700">
                <p className="font-bold text-gray-800 dark:text-white">Audit</p>
              </div>
              <div className="p-4 md:p-5">
                <div className="">
                  <div className="flex flex-col">
                    <div className="py-1">
                      <div className="text-sm">Created By</div>
                      <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                        {project?.createdBy}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="py-1">
                      <div className="text-sm">Date Created</div>
                      <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                        {format(parseISO(project?.dateCreated!), "PPpp")}
                      </div>
                    </div>
                  </div>
                  {!!project?.modifiedBy && (
                    <>
                      <div className="flex flex-col">
                        <div className="py-1">
                          <div className="text-sm">Modified By</div>
                          <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                            {project?.modifiedBy}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="py-1">
                          <div className="text-sm">Date Last Modified</div>
                          <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                            {!!project?.dateModified &&
                              format(parseISO(project?.dateModified), "PPpp")}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
