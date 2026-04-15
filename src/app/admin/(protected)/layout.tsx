import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProtectedAdminLayout({
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
    <div className="min-h-screen bg-navy-light">
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl font-bold text-cream">Liberty Goldens</span>
            <span className="text-border text-lg">|</span>
            <span className="text-muted text-sm">Admin</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-muted text-sm hover:text-gold transition-colors">
              View Site &rarr;
            </Link>
            <LogoutLink />
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">{children}</div>
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
