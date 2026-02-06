import { redirect } from "next/navigation";
import { getSession } from "../lib/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();

	// если нет сессии — middleware обычно уже редиректнул,
	// но на всякий случай держим защиту и тут

	if (!session) redirect("/login?next=/admin/orders");

	// роль проверяем ТОЛЬКО на сервере (подпись сессии проверена в getSession)

	if (session.role !== "admin") redirect("/orders");

	return <>{children}</>;
}