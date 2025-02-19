import React from "react";
import "../styling/ArticleCard.css";

import CommentCount from "./CommentCount";
import ArticleDetails from "./ArticleDetails";
import VotingCard from "./VotingCard";

const ArticleCard = ({ article, handleVote }) => {
  const handleVoteClick = (vote) => {
    handleVote(article.article_id, vote);
  };

  return (
    <div className="article-card">
      <CommentCount count={article.comment_count} />

      <ArticleDetails
        title={article.title}
        author={article.author}
        topic={article.topic}
        created_at={article.created_at}
        article_id={article.article_id}
      />

      <VotingCard
        votes={article.votes}
        userVote={article.userVote}
        onVote={handleVoteClick}
      />
    </div>
  );
};

export default ArticleCard;
