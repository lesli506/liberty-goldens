import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("liberty-admin");

  if (!auth || auth.value !== "authenticated") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-navy">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-cream font-bold text-lg">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-muted text-sm hover:text-cream transition-colors">
            View Site
          </Link>
          <LogoutLink />
        </div>
      </header>
      <div className="p-6">{children}</div>
    </div>
  );
}

function LogoutLink() {
  return (
    <form action="/api/admin/auth/logout" method="POST">
      <button
        type="submit"
        className="text-muted text-sm hover:text-red-400 transition-colors"
      >
        Logout
      </button>
    </form>
  );
}
