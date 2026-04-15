import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-6 text-slate-100">
      <div className="max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
        <div className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-300">
          404
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Page not found
        </h1>
        <p className="mt-4 font-light text-slate-300">
          The route you requested does not exist in Logx.
        </p>
        <div className="mt-6">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-emerald-300"
            to="/"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
