import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-[120px] font-extrabold text-slate-800 leading-none mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-slate-700 mb-4">Page Not Found</h2>
        <p className="text-lg text-slate-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition"
        >
          ← Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
