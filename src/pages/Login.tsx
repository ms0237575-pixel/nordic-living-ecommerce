import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";

type AuthMode = "signin" | "register";

export function Login() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignIn = mode === "signin";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success(isSignIn ? "Signed in successfully" : "Account created");
  }

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-7xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h1 className="mb-2 font-serif text-[36px] text-nordic-charcoal">
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="mb-8 font-sans text-[14px] text-nordic-sage">
          {isSignIn
            ? "Enter your email to access your account and orders."
            : "Create an account to track your orders and save favorites."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-sans text-[12px] font-semibold uppercase tracking-widest text-nordic-charcoal"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full border-b border-nordic-gray/40 bg-transparent py-3 font-sans text-[14px] text-nordic-charcoal transition-colors placeholder:text-nordic-sage focus:border-nordic-charcoal focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-sans text-[12px] font-semibold uppercase tracking-widest text-nordic-charcoal"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete={isSignIn ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full border-b border-nordic-gray/40 bg-transparent py-3 font-sans text-[14px] text-nordic-charcoal transition-colors placeholder:text-nordic-sage focus:border-nordic-charcoal focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-nordic-charcoal py-3 font-sans text-[12px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-nordic-terracotta"
          >
            {isSignIn ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center font-sans text-[14px] text-nordic-sage">
          {isSignIn ? "New to Nordic Living?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(isSignIn ? "register" : "signin")}
            className="font-semibold text-nordic-charcoal underline underline-offset-4 transition-colors hover:text-nordic-terracotta"
          >
            {isSignIn ? "Create Account" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
