import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../ui/navbar/navbar";

function Main() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )

}
export default Main