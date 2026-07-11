import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return toast.error("Fill in all fields");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirmPassword) return toast.error("Passwords don't match");

    setLoading(true);
    try {
      await register({ email: email.trim(), password });
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start saving your snippets and notes">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--border)]
                       bg-[var(--surface)] text-[14px] text-[var(--text)]
                       placeholder:text-[var(--text-muted)]
                       focus:outline-none focus:border-[var(--primary)]/60
                       focus:ring-4 focus:ring-[var(--primary)]/10
                       transition-all duration-200"
          />
        </div>

        <div className="relative">
          <Lock
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-11 pr-11 py-3 rounded-xl border border-[var(--border)]
                       bg-[var(--surface)] text-[14px] text-[var(--text)]
                       placeholder:text-[var(--text-muted)]
                       focus:outline-none focus:border-[var(--primary)]/60
                       focus:ring-4 focus:ring-[var(--primary)]/10
                       transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]
                       hover:text-[var(--text)] transition-colors duration-200"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="relative">
          <Lock
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--border)]
                       bg-[var(--surface)] text-[14px] text-[var(--text)]
                       placeholder:text-[var(--text-muted)]
                       focus:outline-none focus:border-[var(--primary)]/60
                       focus:ring-4 focus:ring-[var(--primary)]/10
                       transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-1.5 flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                     text-[14px] font-medium bg-[var(--primary)] text-white
                     hover:opacity-90 disabled:opacity-60
                     transition-all duration-200 active:scale-[0.98]
                     shadow-sm"
        >
          <UserPlus size={15} />
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-[13px] text-[var(--text-muted)] text-center mt-6">
        {"Already have an account? "}
        <Link to="/login" className="text-[var(--primary)] font-medium hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}