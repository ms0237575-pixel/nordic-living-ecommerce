import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { Eye, EyeOff, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

interface RegisterFormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const initialFormState: RegisterFormState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(form: RegisterFormState): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required.";
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

  if (form.password !== form.confirmPassword) {
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
    <div className="min-h-[85vh] grid lg:grid-cols-12 bg-white">
      {/* Left / Editorial Visual Side */}
      <div className="relative hidden lg:col-span-6 lg:block overflow-hidden bg-nordic-charcoal">
        <img
          src="/images/products/home-striped-sofa.jpg"
          alt="Nordic Lifestyle and Comfort"
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-8000 ease-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-between p-16 text-white z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md self-start font-sans text-[11px] uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5 text-nordic-terracotta" />
            Member Privileges
          </div>

          <div className="space-y-4 max-w-md">
            <p className="font-serif text-[32px] font-normal leading-snug">
              "Home is not a place, it’s a feeling of intentional calm."
            </p>
            <p className="font-sans text-[13px] text-white/70 tracking-widest uppercase">
              Join the Nordic Design Circle
            </p>
          </div>
        </div>
      </div>

      {/* Right / Form Side */}
      <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:col-span-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="space-y-2">
            <span className="font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-nordic-sage-dark">
              Join Us
            </span>
            <h1 className="font-serif text-[36px] font-semibold text-nordic-charcoal">
              Create Account
            </h1>
            <p className="font-sans text-[14px] text-nordic-sage-dark">
              Register for exclusive previews, curated drops, and seamless
              checkouts.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-1 block font-sans text-[12px] font-medium uppercase tracking-wider text-nordic-charcoal"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Astrid Holm"
                className="w-full border-b border-nordic-gray/40 bg-transparent py-2.5 font-sans text-[14px] text-nordic-charcoal outline-none transition-colors duration-300 focus:border-nordic-terracotta"
              />
              {errors.fullName && (
                <p className="mt-1 font-sans text-[12px] text-nordic-terracotta">
                  {errors.fullName}
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
                type="password"
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
              className="group relative mt-6 flex w-full items-center justify-center gap-3 overflow-hidden border border-nordic-charcoal bg-nordic-charcoal py-4 font-sans text-[12px] font-semibold uppercase tracking-widest text-white transition-all duration-500 hover:bg-nordic-terracotta hover:border-nordic-terracotta shadow-md"
            >
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 border-t border-nordic-gray/15 pt-6 flex flex-col items-center gap-4">
            <p className="font-sans text-[13px] text-nordic-sage-dark">
              Already a member?{" "}
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
    </div>
  );
}

export default Register;
