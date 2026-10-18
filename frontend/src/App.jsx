import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import { supabase } from "./lib/supabase";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Unable to load the current session.", error);
      }

      if (isMounted) {
        setSession(data?.session ?? null);
        setIsLoadingSession(false);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession);
      }
    });

    loadSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (isLoadingSession) {
    return null;
  }

  return (
    <>
      {session ? (
        <Dashboard />
      ) : authPage === "signup" ? (
        <Signup onSwitchToLogin={() => setAuthPage("login")} />
      ) : (
        <Login onSwitchToSignup={() => setAuthPage("signup")} />
      )}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
