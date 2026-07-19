import { useState } from "react";
import toast from "react-hot-toast";
import { apiRequestHelper } from "../../api";
import useAsync from "../functions/useAsync";
import { useAuthContext } from "../../context/useAuthContext";

export default function Login({ setHaveAcc }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: ""
  });
  const { setAuth } = useAuthContext();
  const { isLoading, isSlow, run } = useAsync();

  const handleSubmit = async () => {
    if (!formData.email.trim() || !formData.password.trim()) return toast.error("Please enter the login details");

    try {
      const data = await run(() => apiRequestHelper(`/api/auth/login`, {method: "POST", body: formData }))
      setAuth({ token: data.token, user: data.user });
      toast.success("Logged in successfully!");

    } catch (err) {
      toast.error(`Failed to Login, ${err.message}`);
    }
  }

  return (
    <>
        <div className='
        flex flex-col justify-center items-center gap-8 py-8 px-4
         bg-white/10 border border-white/20 backdrop-blur-md
         shadow-xl rounded-2xl h-fit font-sans '>

          <h1 className='font-semibold text-xl'>
            Welcome Back!
          </h1>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className='flex flex-col justify-center gap-4 '>

            <label className='flex gap-2 justify-center items-center font-semibold text-md' htmlFor="email">
              Email:
              <input
                className='flex-1 font-normal rounded-xl outline-1 p-2 focus:ring-1 ring-blue-500 focus:outline-none'
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email..."
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </label>

            <label className='flex gap-2 justify-center items-center font-semibold text-md' htmlFor="password">
              Password:
              <input
                className='flex-1 font-normal rounded-xl outline-1 p-2 focus:ring-1 ring-blue-500 focus:outline-none'
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password..."
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </label>

              <label className="text-sm w-fit flex justify-center items-center gap-2" htmlFor="rememberMe">
              <input
                type="checkbox"
                name="checkbox"
                id="rememberMe"
                value={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              /> Remember me
            </label>

            <button type="submit" disabled={isLoading}
              className="flex-1 sm:w-2/3 sm:mx-auto mt-8 bg-white/10 
              border border-white/20 rounded-md p-2 transition-all duration-700
              hover:shadow-xl hover:scale-105 focus:bg-transparent">
                { isLoading? ( isSlow ? "Waking up the Server..." : "Logging in..." ) : "Log In" }
            </button>
          </form>

              <small>Doesn't have an account?  
            <button onClick={()=> setHaveAcc(prev => !prev)} 
            className="font-semibold hover:text-gray-800 hover:font-semibold transition-all duration-400">
             Sign Up
            </button>
            </small>
        </div>
    </>
  )
}
