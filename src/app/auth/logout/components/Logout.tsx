"use client";
import { useAuth } from "@/app/components/auth/AuthWrapper";
import { UserService } from "@/classes/database/UserService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Logout = () => {
  const router = useRouter();
  const { authenticated, userCookies } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!authenticated) {
      router.push("/auth/signup");
    }
  }, []);

  const logoutUser = async () => {
    const { success, body } = await UserService.logoutUser();

    if (success) {
      // this line may be deleted later
      setErrorMessage("");
      router.push("/");
    } else {
      setErrorMessage(body.message + "\n" + body.details);
      alert("Failed to logout user");
    }
  };

  return (
    <div>
      <h1 className="text-5xl border-b-2 pb-2 mb-8">Logout Page</h1>
      <p className="mb-2">Would you like to logout?</p>
      <button
        className="bg-red-500 mb-4 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        onClick={logoutUser}
      >
        Logout
      </button>

      <p className="text-red-500" style={{ whiteSpace: "pre-wrap" }}>
        {errorMessage}
      </p>
    </div>
  );
};

export default Logout;
