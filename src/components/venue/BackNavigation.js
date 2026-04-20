import Link from "next/link";

export default function BackNavigation() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 transition hover:text-sky-700"
    >
      <span>← </span>
      <span>Back to Home</span>
    </Link>
  );
}
