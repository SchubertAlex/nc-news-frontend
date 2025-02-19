import React from "react";

const MainArticle = ({ article }) => {
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
    </div>
  );
};

export default MainArticle;
