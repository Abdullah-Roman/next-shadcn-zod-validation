"use client";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarRangeIcon,
  EyeIcon,
  EyeOffIcon,
  PersonStanding,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./button";
import { Checkbox } from "./checkbox";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Enter a valid email.",
    }),

    accountType: z.enum(["personal", "company"]),
    acceptTerms: z
      .boolean({
        required_error: "You must accept the conditions.",
      })
      .refine((checked) => checked, "You must accept the terms"),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number().optional(),
    dob: z.date().refine((date) => {
      const today = new Date();
      const eighteedYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date <= eighteedYearsAgo;
    }, "You must be at least 18 years old"),
    password: z
      .string()
      .min(8, "Password must be atleast 8 character")
      .refine(
        (password) => /[A-Z]/.test(password),
        "Password must contain at least one uppercase letter"
      )
      .refine(
        (password) => /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]/.test(password),
        "Password must contain at least one special character"
      ),
    cpassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.cpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cpassword"],
        message: "Password does not match",
      });
    }
    if (data.accountType === "company" && !data.companyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["companyName"],
        message: "Company name is required",
      });
    }

    if (
      data.accountType === "company" &&
      (!data.numberOfEmployees || data.numberOfEmployees < 1)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["numberOfEmployees"],
        message: "Number of employees is required",
      });
    }
  });

const Signform = () => {
  const router = useRouter();
  const [eye, setEye] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      account: "",
      companyName: "",
      password: "",
      cpassword: "",
    },
  });
  const handleSubmit = (values) => {
    console.log(values);
    router.push("/dashboard");
  };

  const accountType = form.watch("accountType");

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
                      <Input
                        placeholder="Enter Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This is your login email</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {accountType === "company" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberOfEmployees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employees</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="Employees"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground w-full"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarRangeIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          captionLayout="dropdown-buttons"
                          fromYear={1990}
                          toYear={2030}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="relative">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          {...field}
                          type={eye ? "text" : "password"}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {eye ? (
                  <EyeIcon
                    className="absolute top-1/2 right-1"
                    onClick={() => setEye(!eye)}
                  />
                ) : (
                  <EyeOffIcon
                    className="absolute top-1/2 right-1"
                    onClick={() => setEye(!eye)}
                  />
                )}
              </div>
              <div className="relative">
                <FormField
                  control={form.control}
                  name="cpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          {...field}
                          type={eye ? "text" : "password"}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {eye ? (
                  <EyeIcon
                    className="absolute top-1/2 right-1"
                    onClick={() => setEye(!eye)}
                  />
                ) : (
                  <EyeOffIcon
                    className="absolute top-1/2 right-1"
                    onClick={() => setEye(!eye)}
                  />
                )}
              </div>
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>accept the terms and conditions.</FormLabel>
                      </div>
                    </div>

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
          <small>Login to your account</small>
          <Button variant="outline" asChild>
            <Link href={`/login`}>Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Signform;
