import { useState } from "react";
import toast from "react-hot-toast";
import { apiRequestHelper } from "../../api";
import useAsync from "../functions/useAsync";
import { useAuthContext } from "../../context/useAuthContext";

export default function Login({ setHaveAcc }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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
          flex flex-col justify-center items-center gap-8 py-12 px-4
        bg-glass backdrop-blur-glass border border-glass-border rounded-lg
          h-fit font-sans md:gap-12 md:px-8'>

          <h1 className='font-semibold text-2xl text-text/80'>
            Welcome Back!
          </h1>

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} 
            className='flex flex-col justify-center gap-4'>

            <label 
              className='flex gap-2 justify-center items-center font-normal text-text/70' 
              htmlFor="email">
              Email:
              <input
                className='flex-1 font-light rounded-sm border border-border outline-none p-2 focus:border-border-focus'
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email..."
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </label>

            <label 
              className='flex gap-2 justify-center items-center font-normal text-text/70' 
              htmlFor="password">
              Password:
              <input
                className='flex-1 font-light rounded-sm border border-border outline-none p-2 focus:border-border-focus'
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password..."
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </label>

              <label 
                className="text-text-muted w-fit flex justify-center items-center gap-2" 
                htmlFor="rememberMe">
              <input
                type="checkbox"
                name="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              /> Remember me
            </label>

            <button type="submit" disabled={isLoading}
              className="flex-1 mx-4 mt-8 p-2 text-text/80 sm:w-2/3 sm:mx-auto bg-glass hover:bg-glass-hover
              border border-glass-border rounded-sm transition-all duration-super-slow
              hover:shadow-sm hover:scale-105 focus:bg-glass-hover">
                { isLoading? ( isSlow ? "Waking up the Server..." : "Logging in..." ) : "Log In" }
            </button>
          </form>

              <small className="font-light text-text-muted">Doesn't have an account?  
            <button onClick={()=> setHaveAcc(prev => !prev)} 
            className="font-semibold text-text-disabled hover:text-text-muted focus:text-text-muted transition-all duration-slow">
             Sign Up
            </button>
            </small>
        </div>
    </>
  )
}
