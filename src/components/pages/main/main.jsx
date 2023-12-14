import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function Main() {
    return (
        <Box padding={2}>
            <Outlet />
        </Box>
    )

}
export default Main