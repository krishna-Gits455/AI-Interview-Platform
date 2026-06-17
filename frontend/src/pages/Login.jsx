
import useAuthStore from "../store/authStore";
import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import AuthCard from "../features/auth/components/AuthCard";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
  useState({
    email: "",
    password: "",
  });

const navigate = useNavigate();

const login =
  useAuthStore(
    (state) => state.login
  );  

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]:
      e.target.value,
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    await login({
      email: formData.email,
      password: formData.password,
    });

    navigate("/dashboard");
  } catch (error) {
    alert(
      error.response?.data
        ?.message ||
        "Login failed"
    );
  } finally {
    setLoading(false);
  }
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
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter email"
/>

            <div>
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