import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-300">404</p>
      <h1 className="mt-4 text-3xl font-bold text-white">That page got devoured by a brainrot.</h1>
      <p className="mt-2 max-w-md text-sm text-slate-300">
        The resource you were looking for is not available. Try jumping back to the hub or browsing the plant and brainrot databases.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-400">
          Return home
        </Link>
        <Link href="/plants" className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-brand-400 hover:text-white">
          Explore plants
        </Link>
      </div>
    </div>
  );
}
