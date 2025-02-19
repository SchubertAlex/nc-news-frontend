import React from "react";
import { Link } from "react-router-dom";

const ArticleDetails = ({ title, author, topic, created_at, article_id }) => {
  return (
    <div className="article-details">
      <h3>{title}</h3>
      <p>By {author}</p>
      <p>Topic: {topic}</p>
      <p>Posted on: {new Date(created_at).toLocaleDateString()}</p>
      <Link to={`/articles/${article_id}`}>Read Full Article</Link>
    </div>
  );
};

export default ArticleDetails;
