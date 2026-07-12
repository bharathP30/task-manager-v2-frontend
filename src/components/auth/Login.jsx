import { useState } from "react";
import toast from "react-hot-toast";
import { apiRequestHelper } from "../../api";
import useAsync from "../functions/useAsync";

export default function Login({ setAuth, setHaveAcc }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: ""
  });

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
      <div className={`absolute min-h-dvh min-w-dvw inset-0 p-0 m-0 bg-[url(https://wallpapercave.com/wp/wp9024400.jpg)] bg-cover flex justify-center items-center `} >

        <div className='flex justify-center flex-col items-center gap-8 py-8 bg-white/20 backdrop-blur-xs border border-white/40 shadow-2xl rounded-2xl p-4 h-fit font-sans hover:backdrop-blur-md hover:scale-105 transition-all duration-1000'>
          <h1 className='font-semibold text-xl'>
            Welcome Back!
          </h1>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className='flex flex-col justify-center gap-2 '>

            {/* <label className='flex gap-2 justify-center items-center' htmlFor="name">Name:
                  <input className='flex-1 rounded-xl outline-none border-none p-2 focus:ring-1 ring-black/20  focus:shadow-2xl shadow-black/40 ' type="text" name="name" id="name" />
                  </label> */}

            <label className='flex gap-2 justify-center items-center' htmlFor="email">Email:
              <input
                className='flex-1 rounded-xl outline-none border-none p-2 focus:ring-1 ring-black/20 focus:shadow-2xl shadow-black/40'
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </label>

            <label className='flex gap-2 justify-center items-center' htmlFor="password">Password:
              <input
                className='flex-1 rounded-xl outline-none border-none p-2 focus:ring-1 ring-black/20 focus:shadow-2xl shadow-black/40 '
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </label>

              <label className="text-xs w-fit flex justify-center items-center gap-2" htmlFor="rememberMe">
              <input
                type="checkbox"
                name="checkbox"
                id="rememberMe"
                value={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              /> Remember me
            </label>

            <button type="submit" disabled={isLoading}
              className="w-1/2 mx-auto mt-8 bg-white/10 border border-white/10 rounded-md p-2 hover:shadow-xl hover:scale-105 transition-all duration-700 focus:bg-transparent">
                { isLoading? ( isSlow ? "Waking up the Server..." : "Logging in..." ) : "Log In" }
            </button>
          </form>

              <small>Doesn't have an account? 
            <button onClick={()=> setHaveAcc(prev => !prev)} 
            className="font-semibold hover:text-black/70 transition-colors duration-700">
              Sign-Up
            </button>
            </small>
        </div>

      </div>
    </>
  )
}
