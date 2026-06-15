import { useState } from "react";
import { Link } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import AuthCard from "../features/auth/components/AuthCard";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Register() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const form =
      new FormData(e.target);

    const password =
      form.get("password");

    const confirmPassword =
      form.get("confirmPassword");

    const newErrors = {};

    if (!password)
      newErrors.password =
        "Password required";

    if (
      password !== confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords must match";
    }

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length
    )
      return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <PublicLayout>

      <div className="min-h-[80vh] flex items-center justify-center px-6">

        <AuthCard
          title="Create Account"
          subtitle="Start your interview journey"
        >

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <Input
              label="Full Name"
              name="name"
            />

            <Input
              label="Email"
              name="email"
            />

            <Input
              label="Password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              error={
                errors.password
              }
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              error={
                errors.confirmPassword
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="text-sm text-slate-400"
            >
              {showPassword
                ? "Hide"
                : "Show"} Password
            </button>

            <Button className="w-full">
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </Button>

            <p className="text-center text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-400"
              >
                Login
              </Link>
            </p>

          </form>

        </AuthCard>

      </div>

    </PublicLayout>
  );
}