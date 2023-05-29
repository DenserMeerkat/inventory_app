import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Items from "./screens/Items";
import Login from "./screens/Login";
import "antd/dist/reset.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Container } from "@mui/material";
import Appbar from "./components/Appbar";

function App() {
  return (
    <Box className="App" bgcolor={"background.default"}>
      <Container maxWidth="lg">
        <Appbar />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Items />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </Box>
  );
}

export default App;
