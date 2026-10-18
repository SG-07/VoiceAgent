import Form from "../dialog/Form";

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

const Signup = ({ onSubmit }) => (
  <main className="flex min-h-screen items-center justify-center bg-[#F6F7FB] px-4 py-8">
    <Form
      data={signupForm}
      submitLabel="signup"
      onSubmit={onSubmit}
    />
  </main>
);

export default Signup;