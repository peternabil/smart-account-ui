import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../ui/navbar/navbar";
import { Box } from "@mui/material";

function Main() {
    return (
        <>
            <Navbar />
            <Box margin={2} p={1}>
                <Outlet />
            </Box>
        </>
    )

}
export default Main