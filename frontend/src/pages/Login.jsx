import { useState } from "react";
import { Link } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import AuthCard from "../features/auth/components/AuthCard";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <PublicLayout>

      <div className="min-h-[80vh] flex items-center justify-center px-6">

        <AuthCard
          title="Welcome Back"
          subtitle="Sign in to continue"
        >

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <Input
              label="Email"
              placeholder="Enter email"
            />

            <div>
              <Input
                label="Password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="text-sm text-slate-400 mt-2"
              >
                {showPassword
                  ? "Hide"
                  : "Show"} Password
              </button>
            </div>

            <Button className="w-full">
              {loading
                ? "Signing In..."
                : "Login"}
            </Button>

            <p className="text-center text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-400"
              >
                Register
              </Link>
            </p>

          </form>

        </AuthCard>

      </div>

    </PublicLayout>
  );
}