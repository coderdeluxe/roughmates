import { useParams } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useGetTaskQuery } from "../../services/api/task-api";
import { GoBack } from "./components/go-back";
import { labels, priorities, statuses } from "./components/data/constants";
import { format, parseISO } from "date-fns";

export const TasksDetailPage = () => {
  const { id }: any = useParams();

  const { data: task, isLoading } = useGetTaskQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      <div>
        <GoBack />
        <div className="pb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Task Detail
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
                <div className="grid grid-cols-3 gap-3">
                  <div className="py-1">
                    <div className="text-sm">Task Code</div>
                    <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                      {task?.code}
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <div className="text-sm">Title</div>
                    <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                      {task?.title}
                    </div>
                  </div>
                  <div className="py-1">
                    <div className="text-sm">Status</div>
                    <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                      {task?.status
                        ? statuses.find(
                            (status) => status.value === task?.status
                          )?.label
                        : ""}
                    </div>
                  </div>
                  <div className="py-1">
                    <div className="text-sm">Label</div>
                    <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                      {task?.label
                        ? labels.find((label) => label.value === task?.label)
                            ?.label
                        : ""}
                    </div>
                  </div>
                  <div className="py-1">
                    <div className="text-sm">Priority</div>
                    <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                      {task?.priority
                        ? priorities.find(
                            (priority) => priority.value === task?.priority
                          )?.label
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="audit">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-2 md:px-5 dark:bg-gray-800 dark:border-gray-700">
                <p className="font-bold text-gray-800 dark:text-white">
                  Audit
                </p>
              </div>
              <div className="p-4 md:p-5">
                <div className="flex flex-col">
                  <div className="py-1">
                    <div className="text-sm">Created By</div>
                    <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                      {task?.createdBy}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="py-1">
                    <div className="text-sm">Date Created</div>
                    <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                      {format(parseISO(task?.dateCreated!), "PPpp")}
                    </div>
                  </div>
                </div>
                {!!task?.modifiedBy && (
                  <>
                    <div className="flex flex-col">
                      <div className="py-1">
                        <div className="text-sm">Modified By</div>
                        <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                          {task?.modifiedBy}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="py-1">
                        <div className="text-sm">Date Last Modified</div>
                        <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                          {!!task?.dateModified &&
                            format(parseISO(task?.dateModified), "PPpp")}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
