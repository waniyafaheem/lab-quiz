"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import userSchema from "@/schemas/userSchema";
import { z } from "zod";

// Define the TypeScript type for form values using zod inference
type UserFormValues = z.infer<typeof userSchema>;

export default function Home() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      gender: "",
      age: 0,
    },
  });

  function onSubmit(values: UserFormValues) {
    // Do something with the form values.
    console.log(values);

    // Navigate to the home page after form submission
    router.push("/home");
  }

  return (
    <main className="flex flex-col justify-center items-center gap-y-6 p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            {...register("username")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <input
            id="gender"
            {...register("gender")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender.message}</p>}
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input
            id="age"
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.age && <p className="mt-2 text-sm text-red-600">{errors.age.message}</p>}
        </div>
        <Button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
          Submit
        </Button>
      </form>
    </main>
  );
}