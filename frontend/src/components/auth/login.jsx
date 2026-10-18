import { useState } from "react";
import toast from "react-hot-toast";
import Form from "../dialog/Form";
import { supabase } from "../../lib/supabase";

const loginForm = {
  size: "md",
  title: "Welcome back",
  description: "Log in to continue using your voice agent.",
  fields: [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ],
};

const Login = ({ onSwitchToSignup }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async ({ email, password }) => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged in successfully.");
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#F6F7FB] px-4 py-6 sm:px-6 sm:py-8">
      <div className="w-full max-w-md">
        <Form
          data={{ ...loginForm, disabled: isSubmitting }}
          submitLabel={isSubmitting ? "Logging in..." : "login"}
          onSubmit={handleLogin}
        />
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="mt-4 w-full border-0 bg-transparent px-2 py-2 text-center text-[13px] text-[#0071B6] hover:underline"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </main>
  );
};

export default Login;
