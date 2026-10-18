import { useState } from "react";
import toast from "react-hot-toast";
import Form from "../dialog/Form";
import { supabase } from "../../lib/supabase";

const signupForm = {
  size: "md",
  title: "Create your account",
  description: "Sign up to get started with your voice agent.",
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
    },
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
      placeholder: "Create a password",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm password",
      type: "password",
      placeholder: "Confirm your password",
      required: true,
    },
  ],
};

const Signup = ({ onSwitchToLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async ({ name, email, password }) => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account created. Check your email to confirm your account.");
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#F6F7FB] px-4 py-6 sm:px-6 sm:py-8">
      <div className="w-full max-w-md">
        <Form
          data={{ ...signupForm, disabled: isSubmitting }}
          submitLabel={isSubmitting ? "Signing up..." : "signup"}
          onSubmit={handleSignup}
        />
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="mt-4 w-full border-0 bg-transparent px-2 py-2 text-center text-[13px] text-[#0071B6] hover:underline"
        >
          Already have an account? Log in
        </button>
      </div>
    </main>
  );
};

export default Signup;