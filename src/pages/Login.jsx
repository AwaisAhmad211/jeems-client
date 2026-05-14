import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react"; // Added Loader2

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 1. Added Loading state
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [message, setMessage] = useState(""); // State for error/success messages

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // 2. Start Loading
    try {
      if (currentState === "Sign Up") {
        await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        // toast.success("Welcome to Mahnoor Sahi. Please sign in.");
        setMessage("Account created successfully. Please sign in.");
        setCurrentState("Login");
        setName("");
        setPassword("");
        setLoading(false); // Stop loading before return
        return;
      }

      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setToken(data.accessToken);
      toast.success("Welcome Back");
      setMessage("");
      navigate("/");
    } catch (error) {
      // toast.error(error.response?.data?.message || "Authentication failed");
      setMessage(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false); // 3. Ensure loading stops whether success or fail
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="h-[70vh] bg-[var(--color-bg-page)] flex items-center justify-center px-4 pt-20 pb-10 page-transition relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-bg-cream-warm)] -z-10" />

      <div className="w-full max-w-[450px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,49,31,0.05)] border border-gray-100 p-8 md:p-12 transition-all duration-500 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-[var(--color-primary-dark)] mb-3 transition-all duration-500">
            {currentState === "Login" ? "Welcome Back" : "Join the House"}
          </h1>
          <p className="text-gray-400 text-xs tracking-[0.2em] uppercase">
            {currentState === "Login"
              ? "Enter your credentials to continue"
              : "Create your private account"}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* Name Input (Sign Up Only) */}
          {currentState === "Sign Up" && (
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[var(--color-accent-lime)] transition-colors"
                size={18}
              />
              <input
                value={name}
                onChange={(e) => {  setName(e.target.value); setMessage(""); }} // Clear message on input change
                type="text"
                disabled={loading}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-1 focus:ring-[var(--color-accent-lime)] transition-all outline-none disabled:opacity-50"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          {/* Email Input */}
          <div className="relative group">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7fb519] transition-colors"
              size={18}
            />
            <input
              value={email}
              onChange={(e) => {  setEmail(e.target.value); setMessage(""); }} // Clear message on input change
              type="email"
              disabled={loading}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-1 focus:ring-[#7fb519] transition-all outline-none disabled:opacity-50"
              placeholder="Email Address"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7fb519] transition-colors"
              size={18}
            />
            <input
              value={password}
              onChange={(e) => {  setPassword(e.target.value); setMessage(""); }} // Clear message on input change
              type={showPassword ? "text" : "password"}
              disabled={loading}
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-1 focus:ring-[var(--color-accent-lime)] transition-all outline-none disabled:opacity-50"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="text-red-400">
            <span>{message}</span>
          </div>
          {currentState === "Login" && (
            <div className="flex justify-end px-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => navigate("/forgot-password")}
                className="text-[10px] tracking-[0.15em] uppercase font-bold text-gray-400 hover:text-[var(--color-accent-lime)] transition-colors disabled:opacity-50"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button with Loading UI */}
          <button
            disabled={loading}
            className={`w-full bg-[var(--color-primary-dark)] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-[var(--color-primary-dark)]/10 group ${loading ? "opacity-80 cursor-not-allowed" : "hover:bg-[var(--color-primary-dark-hover)]"}`}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                {currentState === "Login" ? "Sign In" : "Create Account"}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            {currentState === "Login"
              ? "New to Mahnoor Sahi?"
              : "Already a member?"}{" "}
            <button
              disabled={loading}
              onClick={() =>{
                setCurrentState(currentState === "Login" ? "Sign Up" : "Login");
                setMessage("");
              }
              }
              className="text-[#7fb519] font-bold hover:underline underline-offset-4 decoration-2 disabled:opacity-50 disabled:no-underline"
            >
              {currentState === "Login" ? "Sign Up Now" : "Login Here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
