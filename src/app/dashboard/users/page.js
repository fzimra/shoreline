"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TableRowActions from "@/components/dashboard/TableRowActions";

export default function DashboardUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setFetchError("");

      try {
        const response = await fetch("/api/users", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to fetch users.");
        }

        const mappedUsers = Array.isArray(data)
          ? data.map((user) => ({
              id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
            }))
          : [];

        setUsers(mappedUsers);
      } catch (error) {
        setFetchError(error.message || "Unable to load users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <header className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700/80">
          Users
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Team and access
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Monitor user accounts and role-based access across the workspace.
        </p>
      </header>

      <section className="mt-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Users Table
          </h2>
          <Link
            href="/dashboard/users/new"
            className="rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Add New User
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Name
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Email
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Role
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="border-t border-slate-100">
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-sm text-slate-500"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : fetchError ? (
                <tr className="border-t border-slate-100">
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-sm text-rose-600"
                  >
                    {fetchError}
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr className="border-t border-slate-100">
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-sm text-slate-500"
                  >
                    No users found. Use "Add New User" to create one.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {user.username}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {user.role}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <TableRowActions
                        itemLabel="user"
                        editHref={`/dashboard/users/${user.id}/edit`}
                        deletePath={`/api/users/${user.id}`}
                        onDeleteSuccess={() => {
                          setUsers((current) =>
                            current.filter((item) => item.id !== user.id),
                          );
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
