import React, { useContext, useState } from "react";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);

  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true }
      );
      console.log(result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black font-sans antialiased overflow-x-hidden relative selection:bg-black selection:text-white pt-12">
      {/* Background Color Orbs */}
      <div className="absolute top-0 right-0 w-130 h-130 bg-linear-to-bl from-cyan-100/40 via-blue-50/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-linear-to-tr from-indigo-50/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Section */}
      <main className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh] gap-16 py-12">

          {/* Left Side: Typography */}
          <div className="max-w-xl space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200/80 rounded-full shadow-sm text-neutral-600 text-xs font-semibold uppercase tracking-wider">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Secure Login Enabled
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-neutral-900">
              Welcome back.<br />
              <span className="font-extrabold bg-linear-to-r from-black via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
                Ready to shop?
              </span>
            </h1>

            <p className="text-neutral-500 text-lg max-w-md font-normal leading-relaxed mx-auto lg:mx-0">
              Log in to access your customized feed, saved carts, and premium tracking updates.
            </p>
          </div>

          {/* Right Side: Floating Login Card */}
          <div className="w-full max-w-md relative group">
            <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-3xl p-8 sm:p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] ring-1 ring-black/2">
              <div className="space-y-2 mb-8 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
                  Sign In
                </h2>
                <p className="text-neutral-400 text-sm">
                  Enter your credentials to access your account.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3.5 bg-neutral-50/50 border border-neutral-200/80 rounded-xl text-black text-sm outline-none focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5 transition-all duration-200"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-1 relative">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Password</label>
                    <span className="text-xs text-neutral-400 hover:text-black cursor-pointer hover:underline transition mb-1">
                      Forgot?
                    </span>
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 pr-12 py-3.5 bg-neutral-50/50 border border-neutral-200/80 rounded-xl text-black text-sm outline-none focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5 transition-all duration-200"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-9.5 text-neutral-400 hover:text-black transition-all duration-200"
                  >
                    {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 py-4 bg-black text-white hover:bg-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-400 rounded-xl font-bold text-sm tracking-wide active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-black/10 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-neutral-100"></div>
                <span className="px-3 text-neutral-300 text-xs font-bold tracking-widest">OR</span>
                <div className="flex-1 border-t border-neutral-100"></div>
              </div>

              {/* Google Login Button */}
              <div>
                <button
                  className="w-full flex items-center justify-center gap-3 h-12 bg-white border border-neutral-200 text-black hover:bg-neutral-50 py-3.5 rounded-xl transition active:scale-[0.98] text-sm font-bold shadow-sm cursor-pointer"
                  onClick={googleLogin}
                >
                  <img src={google} alt="Google" className="w-8 rounded-lg" />
                  Continue with Google
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-500">
                  Don't have an account?{" "}
                  <span
                    onClick={() => navigate("/signup")}
                    className="font-semibold text-black hover:underline cursor-pointer transition"
                  >
                    Create Account
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Login;