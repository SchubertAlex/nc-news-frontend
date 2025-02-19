import React from "react";
import ArticleCard from "./ArticleCard";

const ArticleList = ({ articles, handleVote }) => {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.article_id}>
          <ArticleCard article={article} handleVote={handleVote} />
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
