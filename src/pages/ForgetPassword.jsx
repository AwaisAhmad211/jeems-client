import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { Mail, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/user/forgot-password", {
        email,
      });
      toast.success(data.message || "Reset link sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[70vh] bg-[var(--color-bg-page)] flex items-center justify-center px-4 pt-20 pb-10 page-transition relative overflow-hidden">
      {/* Background Decor (Matched to Login) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-bg-cream-warm)] -z-10" />

      <div className="w-full max-w-[450px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,49,31,0.05)] border border-gray-100 p-8 md:p-12 transition-all duration-500 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-[var(--color-primary-dark)] mb-3">
            Recover Access
          </h1>
          <p className="text-gray-400 text-xs tracking-[0.2em] uppercase">
            Enter your email to receive a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative group">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[var(--color-accent-lime)] transition-colors"
              size={18}
            />
            <input
              type="email"
              required
              disabled={loading}
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-1 focus:ring-[var(--color-accent-lime)] transition-all outline-none disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className={`w-full bg-[var(--color-primary-dark)] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-[var(--color-primary-dark)]/10 group ${
              loading ? "opacity-80 cursor-not-allowed" : "hover:bg-[var(--color-primary-dark-hover)]"
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
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
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 w-full text-gray-400 text-sm font-medium hover:text-[#00311F] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
