import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { Header } from "./components/Header";
import { Fragment } from "react";
import { ThemePage } from "./pages/ThemePage";

export default function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/theme" element={<ThemePage />} />
      </Routes>
    </Fragment>
  );
}