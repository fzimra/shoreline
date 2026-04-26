"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function TableRowActions({
  editHref,
  deletePath,
  itemLabel,
  viewHref,
  onDeleteSuccess,
  successMessage,
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete this ${itemLabel}?`);

    if (!confirmed) {
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(deletePath, { method: "DELETE" });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.error || `Failed to delete ${itemLabel}.`);
      }

      onDeleteSuccess?.();
      if (successMessage) {
        toast.success(successMessage);
      }
      router.refresh();
    } catch (deleteError) {
      setError(deleteError.message || `Unable to delete ${itemLabel}.`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-3">
        {viewHref ? (
          <Link
            href={viewHref}
            className="text-xs font-semibold text-slate-600 transition hover:text-slate-900"
          >
            View
          </Link>
        ) : null}
        <Link
          href={editHref}
          className="text-xs font-semibold text-sky-700 transition hover:text-sky-800"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-xs font-semibold text-rose-700 transition hover:text-rose-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
