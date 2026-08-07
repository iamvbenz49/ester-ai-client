import { Suspense } from "react";
import AuthLayout from "../components/AuthLayout";
import SignupForm from "../components/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <Suspense fallback={null}>
        <SignupForm />
      </Suspense>
    </AuthLayout>
  );
}
