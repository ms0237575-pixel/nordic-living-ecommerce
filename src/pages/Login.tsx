import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface LoginFormState {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const initialFormState: LoginFormState = {
  email: "",
  password: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(form: LoginFormState): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.password) {
    errors.password = "Password is required.";
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState<LoginFormState>(initialFormState);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(formData.email.trim());
      toast.success("Welcome back! Successfully logged in.");
      const state = location.state as { from?: { pathname?: string } } | null;
      navigate(state?.from?.pathname ?? "/");
    }, 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-nordic-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-none border border-nordic-charcoal/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-nordic-charcoal sm:text-[2rem]">
            Welcome Back
          </h1>
          <p className="mt-2 font-sans text-sm text-nordic-sage-dark">
            Enter your credentials to continue.
          </p>
        </div>

        <form onSubmit={handleSignIn} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-sans text-[12px] font-medium uppercase tracking-wider text-nordic-charcoal"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@domain.com"
              autoComplete="email"
              className="w-full border-b border-nordic-gray/40 bg-transparent py-3 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors duration-300 focus:border-nordic-terracotta"
            />
            {errors.email && (
              <p className="mt-1.5 font-sans text-[12px] text-nordic-terracotta">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="font-sans text-[12px] font-medium uppercase tracking-wider text-nordic-charcoal"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => toast.info("Password reset instructions sent.")}
                className="font-sans text-[12px] text-nordic-sage-dark transition-colors hover:text-nordic-terracotta"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full border-b border-nordic-gray/40 bg-transparent py-3 pr-10 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors duration-300 focus:border-nordic-terracotta"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-nordic-sage-dark transition-colors hover:text-nordic-charcoal"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 font-sans text-[12px] text-nordic-terracotta">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative mt-4 flex w-full items-center justify-center gap-3 overflow-hidden border border-nordic-charcoal bg-nordic-charcoal py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-nordic-terracotta hover:border-nordic-terracotta shadow-sm"
          >
            <span>{loading ? "Authenticating..." : "SIGN IN"}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-nordic-gray/15 pt-6">
          <p className="font-sans text-[13px] text-nordic-sage-dark">
            New to Nordic Living?{" "}
            <Link
              to="/register"
              className="font-medium text-nordic-charcoal underline underline-offset-4 transition-colors hover:text-nordic-terracotta"
            >
              Create an Account
            </Link>
          </p>

          <div className="flex items-center gap-2 font-sans text-[11px] text-nordic-sage-dark/80">
            <ShieldCheck className="h-4 w-4 text-nordic-charcoal" />
            <span>Protected by Scandinavian Security Standards</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
