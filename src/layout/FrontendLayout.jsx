//主控layout 放header、footer、main

import { Outlet, NavLink } from "react-router-dom";

import Header from "../components/Header"; // 可選

export default function FrontendLayout() {
  return (
    <>
      <Header />
      <main class="container ui-layout">
        {/* 請問這個 container 是可以拿掉的嗎? */}
        <Outlet />
      </main>
      <hr />
      <footer className="mt-4 text-center">
        <p>footer</p>
      </footer>
    </>
  );
}
