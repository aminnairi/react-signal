import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { Header } from "./components/Header";
import { Fragment } from "react";
import { ThemePage } from "./pages/ThemePage";
import { UserPage } from "./pages/UserPage";

export default function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/theme" element={<ThemePage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Fragment>
  );
}