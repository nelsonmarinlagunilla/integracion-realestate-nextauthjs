"use client";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
      });
      console.log(signupResponse);
      const res = await signIn('credentials', {
        email: signupResponse.data.email,
        password: signupResponse.data.password,
        redirect: false,
      })
      if (res?.ok) return router.push("/dashboard")

    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };
  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form onSubmit={handleSubmit} className="bg-neutral-500 px-8 py-10 w-3/12">
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7">Sign Up</h1>
        <input
          type="text"
          placeholder="Jon Doe"
          name="fullname"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <input
          type="email"
          placeholder="example@domain.com"
          name="email"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <input
          type="password"
          placeholder="********"
          name="password"
          className="bg-zinc-800 px-4 py-2 block mb-2"
        />
        <button type="submit" className="bg-indigo-500 px-4 py-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
