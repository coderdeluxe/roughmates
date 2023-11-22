import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import "./css/style.css"
import Header from "./layouts/header";
import Sidebar from "./layouts/sidebar";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useAppDispatch } from "./states/store";
import { setCurrentUser } from "./states/slice/account-slice";

function App() {
  var user = useLocalStorage("profile").getItem();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (user) {
      dispatch(setCurrentUser(user));
    } else {
      navigate("/login");
    }
  }, [setCurrentUser, user]);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
