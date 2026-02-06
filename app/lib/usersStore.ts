import { promises as fs } from "fs";
import path from "path";
import type { Role } from "./session";

export type User = {
	id: string;
	email: string;
	passwordHash: string;
	role: Role;
	createdAt: string;
};

const DATADIR = path.join(process.cwd(), ".data");
const USERS_PATH = path.join(DATADIR, "users.json");

async function ensureUsersFile() {
	await fs.mkdir(DATADIR, { recursive: true });
	try {
		await fs.access(USERS_PATH);
	} catch {
		await fs.writeFile(USERS_PATH, JSON.stringify([], null, 2), "utf-8");
	}
}

export async function readUsers(): Promise<User[]> {
	await ensureUsersFile();
	const raw = await fs.readFile(USERS_PATH, "utf-8");
	if (!raw.trim()) return [];
	const parsed = JSON.parse(raw);
	return Array.isArray(parsed) ? (parsed as User[]) : [];
}

export async function getUserByEmail(email: string): Promise<User[] | null> {
	const users = await readUsers();
	const e = email.trim().toLowerCase();
	return users.find((u) => u.email === e) ?? null;
}
