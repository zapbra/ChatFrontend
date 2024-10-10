import { useAuth } from "@/app/components/auth/AuthWrapper";
import Signup from "./components/Signup";

const SignupPage = () => {
  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <Signup />;
    </div>
  );
};

export default SignupPage;
