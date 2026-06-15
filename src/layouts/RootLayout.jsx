import React from "react";
import NavBar from "../shared/NavBar/NavBar";
import { Outlet } from "react-router";
import Footer from "../shared/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col dark:bg-slate-900">
        <header>
          <nav>
            <NavBar></NavBar>
          </nav>
        </header>
        <main className="flex-1">
          <Outlet></Outlet>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </>
  );
};

export default RootLayout;
