import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateProjectMutation } from "../../services/api/project-api";
import { useNavigate } from "react-router-dom";
import { ProjectBasicSchema, TProjectForm } from "../../models/project";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../components/ui/toast/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { GoBack } from "../../components/ui/go-back";

export const ProjectPageCreate = () => {
  const form = useForm<TProjectForm>({
    resolver: zodResolver(ProjectBasicSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TProjectForm> = (data) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    createProject(data);

    navigate("/projects");
  };

  return (
    <>
      <GoBack to="/projects" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-4 px-2 md:flex md:justify-between md:items-center dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Create Project
            </h2>
            <div>
              <div className="inline-flex gap-x-4">
                <Button disabled={isLoading} type="submit">
                  {isLoading ? (
                    <span
                      className="mr-2 animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                      role="status"
                      aria-label="loading"
                    />
                  ) : null}
                  Submit
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="py-4 px-2 grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};
