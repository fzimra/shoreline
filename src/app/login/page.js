import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { decodeAuthSession, getAuthCookieName } from "@/utils/auth-session";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(getAuthCookieName())?.value;
  const session = decodeAuthSession(sessionCookie);

  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
