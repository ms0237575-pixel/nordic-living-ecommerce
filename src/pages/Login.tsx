import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

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
  }

  return errors;
}

export function Login() {
  const [formData, setFormData] = useState<LoginFormState>(initialFormState);
  const [errors, setErrors] = useState<LoginFormErrors>({});

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

    toast.success("Signed in successfully");
  };

  const handleForgotPassword = () => {
    toast.info("Password reset is coming soon");
  };

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-7xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h1 className="font-serif text-h1 font-semibold text-nordic-charcoal">
          Welcome Back
        </h1>
        <p className="mt-4 font-sans text-body font-normal text-nordic-sage">
          Enter your email to access your account and orders.
        </p>

        <form onSubmit={handleSignIn} className="mt-12 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-sans text-[14px] font-normal text-nordic-charcoal"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              className="w-full rounded-none border border-nordic-gray/30 bg-nordic-bg px-3 py-2 font-sans text-[14px] text-nordic-charcoal focus:border-nordic-charcoal focus:ring-0"
            />
            {errors.email && (
              <p className="mt-2 font-sans text-[13px] font-normal text-nordic-terracotta">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="font-sans text-[14px] font-normal text-nordic-charcoal"
              >
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-sans text-[13px] font-normal text-nordic-sage transition-colors duration-300 hover:text-nordic-terracotta"
              >
                Forgot Password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              className="w-full rounded-none border border-nordic-gray/30 bg-nordic-bg px-3 py-2 font-sans text-[14px] text-nordic-charcoal focus:border-nordic-charcoal focus:ring-0"
            />
            {errors.password && (
              <p className="mt-2 font-sans text-[13px] font-normal text-nordic-terracotta">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 w-full border border-nordic-charcoal bg-nordic-charcoal px-6 py-4 font-sans text-button font-medium uppercase tracking-widest text-white transition-colors duration-300 hover:bg-nordic-charcoal/90"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center font-sans text-[14px] font-normal text-nordic-sage">
          New to Nordic Living?{" "}
          <Link
            to="/register"
            className="font-medium text-nordic-charcoal underline underline-offset-4 transition-colors duration-300 hover:text-nordic-terracotta"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
