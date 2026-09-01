import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

interface RegisterFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const initialFormState: RegisterFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(form: RegisterFormState): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!form.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

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

  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState<RegisterFormState>(initialFormState);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(formData.email.trim());
      toast.success("Welcome to Nordic Living! Account created.");
      navigate("/");
    }, 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-nordic-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-none border border-nordic-charcoal/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-nordic-charcoal sm:text-[2rem]">
            Create an Account
          </h1>
          <p className="mt-2 font-sans text-sm text-nordic-sage-dark">
            Register for curated collections and seamless checkouts.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1 block font-sans text-[12px] font-medium uppercase tracking-wider text-nordic-charcoal"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="e.g. Astrid"
              className="w-full border-b border-nordic-gray/40 bg-transparent py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors duration-300 focus:border-nordic-terracotta"
            />
            {errors.firstName && (
              <p className="mt-1 font-sans text-[12px] text-nordic-terracotta">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-1 block font-sans text-[12px] font-medium uppercase tracking-wider text-nordic-charcoal"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="e.g. Holm"
              className="w-full border-b border-nordic-gray/40 bg-transparent py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors duration-300 focus:border-nordic-terracotta"
            />
            {errors.lastName && (
              <p className="mt-1 font-sans text-[12px] text-nordic-terracotta">
                {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-1 block font-sans text-[12px] font-medium uppercase tracking-wider text-nordic-charcoal"
            >
              Email Address
            </label>
            <input
              id="register-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="astrid@domain.com"
              className="w-full border-b border-nordic-gray/40 bg-transparent py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors duration-300 focus:border-nordic-terracotta"
            />
            {errors.email && (
              <p className="mt-1 font-sans text-[12px] text-nordic-terracotta">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="mb-1 block font-sans text-[12px] font-medium uppercase tracking-wider text-nordic-charcoal"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="At least 6 characters"
                className="w-full border-b border-nordic-gray/40 bg-transparent py-2.5 pr-10 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors duration-300 focus:border-nordic-terracotta"
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
              <p className="mt-1 font-sans text-[12px] text-nordic-terracotta">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block font-sans text-[12px] font-medium uppercase tracking-wider text-nordic-charcoal"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Repeat your password"
              className="w-full border-b border-nordic-gray/40 bg-transparent py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors duration-300 focus:border-nordic-terracotta"
            />
            {errors.confirmPassword && (
              <p className="mt-1 font-sans text-[12px] text-nordic-terracotta">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative mt-6 flex w-full items-center justify-center gap-3 overflow-hidden border border-nordic-terracotta bg-nordic-terracotta py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-nordic-charcoal hover:border-nordic-charcoal shadow-sm"
          >
            <span>{loading ? "Creating Account..." : "CREATE ACCOUNT"}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-nordic-gray/15 pt-6">
          <p className="font-sans text-[13px] text-nordic-sage-dark">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-nordic-charcoal underline underline-offset-4 transition-colors hover:text-nordic-terracotta"
            >
              Sign In
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

export default Register;
