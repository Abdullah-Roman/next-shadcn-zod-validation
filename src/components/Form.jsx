"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonStanding } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";

const formSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Incorrect Password",
  }),
});

const Forms = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <PersonStanding size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Login to your support me Account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 "
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormDescription>This is your login email</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="passowrd"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Don't have login account?</small>
          <Button variant="outline" asChild>
            <Link href={`/signup`}>Sign Up</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Forms;
