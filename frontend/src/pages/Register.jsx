import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";

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

  const [formData, setFormData] =
  useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

const navigate = useNavigate();  

  const [errors, setErrors] =
    useState({});

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};  

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!formData.password) {
    newErrors.password =
      "Password required";
  }

  if (
    formData.password !==
    formData.confirmPassword
  ) {
    newErrors.confirmPassword =
      "Passwords must match";
  }

  setErrors(newErrors);

  if (
    Object.keys(newErrors).length
  )
    return;

  try {
    setLoading(true);

    await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    navigate("/login");
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Registration failed"
    );
  } finally {
    setLoading(false);
  }
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
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              error={errors.password}
            />

            <Input
                label="Confirm Password"
                name="confirmPassword"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
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