import { Link } from "react-router-dom";

export const GoBack = ({ to }: { to: string }) => {

  return (
    <Link
      className="w-full sm:w-auto inline-flex justify-center items-center gap-2 font-semibold focus:outline-nonefocus:ring-offset-2 transition-all text-sm pb-4 dark:ring-offset-slate-900"
      to={to}
    >
      <svg
        className="w-2.5 h-2.5"
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M11.2792 1.64001L5.63273 7.28646C5.43747 7.48172 5.43747 7.79831 5.63273 7.99357L11.2792 13.64"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
      Go back
    </Link>
  );
};
