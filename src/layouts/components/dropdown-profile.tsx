import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../states/store";
import { Button } from "../../components/ui/button";
import { setSignOut } from "../../states/slice/account-slice";

export default function DropdownProfile({
  align,
}: {
  align?: "left" | "right";
}) {
  const user = useAppSelector((state) => state.account.user);
  const dispatch = useAppDispatch();
  return (
    <Menu as="div" className="relative inline-flex">
      <Menu.Button className="inline-flex justify-center items-center group">
        <img
          className="w-8 h-8 rounded-full"
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
          width={32}
          height={32}
          alt="User"
        />
        {/* <div className="flex items-center truncate">
            <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">{user?.name}</span>
            <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div> */}
      </Menu.Button>
      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-[11rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-800 dark:text-slate-100">
            {user?.email}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 italic">
            Administrator
          </div>
        </div>
        <Menu.Items as="ul" className="focus:outline-none">
          <Menu.Item as="li">
            {({ active }) => (
              <Link
                className={`font-medium text-sm flex items-center py-1 px-3 ${
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-indigo-500"
                }`}
                to="#0"
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item as="li">
            {({ active }) => (
              <Link
                className={`font-medium text-sm flex items-center py-1 px-3 ${
                  active
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-indigo-500"
                }`}
                to="/login"
                onClick={() => {
                  dispatch(setSignOut());
                }}
              >
                Sign Out
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
