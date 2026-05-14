import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error

  useEffect(() => {
    const verify = async () => {
      try {
        await axiosInstance.get(`/api/user/verify-email/${token}`);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="h-screen bg-[var(--color-bg-page)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] p-12 shadow-[0_20px_50px_rgba(0,49,31,0.05)] text-center border border-gray-100">
        {status === "verifying" && (
          <div className="space-y-6">
            <Loader2
              className="mx-auto animate-spin text-[var(--color-accent-lime)]"
              size={40}
            />
            <h2 className="font-serif text-2xl text-[#00311F]">
              Authenticating...
            </h2>
            <p className="text-gray-400 text-sm uppercase tracking-widest">
              Verifying your luxury account
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="text-[var(--color-accent-lime)]" size={40} />
            </div>
            <h2 className="font-serif text-3xl text-[var(--color-primary-dark)]">Verified</h2>
            <p className="text-gray-500 text-sm">
              Your email has been successfully confirmed. Welcome to the House.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[var(--color-primary-dark)] text-white py-4 rounded-2xl font-bold text-xs tracking-[0.2em] flex items-center justify-center gap-2"
            >
              CONTINUE TO SIGN IN <ArrowRight size={16} />
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="text-red-400" size={40} />
            </div>
            <h2 className="font-serif text-2xl text-[var(--color-primary-dark)]">Link Expired</h2>
            <p className="text-gray-500 text-sm">
              This verification link is no longer valid or has already been
              used.
            </p>
            <Link
              to="/login"
              className="block text-[var(--color-accent-lime)] font-bold text-xs tracking-widest uppercase"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
