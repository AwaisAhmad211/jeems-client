import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { Lock, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      await axiosInstance.post(`/api/user/reset-password/${token}`, {
        password,
      });
      toast.success("Password updated! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Link expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[70vh] bg-[var(--color-bg-page)] flex items-center justify-center px-4 pt-20 pb-10 page-transition relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-bg-cream-warm)] -z-10" />

      <div className="w-full max-w-[450px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,49,31,0.05)] border border-gray-100 p-8 md:p-12 transition-all duration-500 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-[var(--color-primary-dark)] mb-3">
            New Credentials
          </h1>
          <p className="text-gray-400 text-xs tracking-[0.2em] uppercase">
            Create a secure password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password Input */}
          <div className="relative group">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7fb519] transition-colors"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              required
              disabled={loading}
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-1 focus:ring-[#7fb519] transition-all outline-none disabled:opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative group">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7fb519] transition-colors"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              required
              disabled={loading}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-1 focus:ring-[#7fb519] transition-all outline-none disabled:opacity-50"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className={`w-full bg-[#00311F] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-[#00311F]/10 group ${
              loading ? "opacity-80 cursor-not-allowed" : "hover:bg-[#004d31]"
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <span>Update Password</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
