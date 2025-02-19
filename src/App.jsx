import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}
export default App;
