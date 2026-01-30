
//主控layout 放header、footer、main

import { Outlet, NavLink } from "react-router-dom";

export default function FrontendLayout() {
    return (<>
        <header>
            <ul className="nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/" >
                        稀寵搜搜
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/rarepetfinder" >
                        搜尋頁
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/articles" >
                        稀寵資訊
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login" >
                        登入
                    </NavLink>
                </li>
            </ul>
        </header>
        <hr />

        <main>
            <Outlet />
        </main>
        <hr />

        <footer className="mt-4 text-center">
            <p>footer</p>
        </footer>

    </>)
};