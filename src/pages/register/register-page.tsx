import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { RegisterSchema, TRegisterForm } from "../../models/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../components/ui/toast/use-toast";
import { useRegisterMutation } from "../../services/api/account-api";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const form = useForm<TRegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [register, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TRegisterForm> = (data) => {
    register(data)
      .unwrap()
      .then((data) => {
        console.log(data);
        localStorage.setItem("profile", JSON.stringify(data));
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: "Error occured",
          description: <> {error.data.message}</>,
        });
      });
  };

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="mt-20 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Register
            </h1>
          </div>
          <div className="mt-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="py-4 px-2 grid gap-2">
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} type="email" />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Confirm Password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button disabled={isLoading} type="submit" className="mt-4">
                    {isLoading ? (
                      <span
                        className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                        role="status"
                        aria-label="loading"
                      />
                    ) : null}

                    <span className="ml-2">Login</span>
                  </Button>
                </div>
              </form>
            </Form>
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className=" font-semibold text-blue-800">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
