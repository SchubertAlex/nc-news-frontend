import React, { useEffect, useState } from "react";
import { fetchArticle, updateVotes } from "../utils/api";
import VoteButton from "./VoteButton";

const Article = ({ article_id }) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(() => {
    const savedVotes = localStorage.getItem("userVotes");
    return savedVotes ? JSON.parse(savedVotes) : {};
  });

  useEffect(() => {
    fetchArticle(article_id)
      .then((data) => {
        setArticle({ ...data, userVote: voted[article_id] || 0 });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
      });
  }, [article_id]);

  useEffect(() => {
    localStorage.setItem("userVotes", JSON.stringify(voted));
  }, [voted]);

  const handleVote = (vote) => {
    const currentVote = voted[article_id] || 0;
    let newVote;

    if (currentVote === vote) {
      return;
    } else if (currentVote === -vote) {
      newVote = 0;
    } else {
      newVote = vote;
    }

    const voteDifference = newVote - currentVote;

    updateVotes(article_id, voteDifference)
      .then((updatedArticle) => {
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: updatedArticle.votes,
          userVote: newVote,
        }));

        setVoted((prevVoted) => ({
          ...prevVoted,
          [article_id]: newVote,
        }));
      })
      .catch((error) => {
        console.error("Failed to update vote:", error);
      });
  };

  if (loading) return <p>Loading article...</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>
        By {article.author} |{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>
      <p>{article.body}</p>
      <VoteButton
        votes={article.votes}
        userVote={article.userVote}
        onVote={handleVote}
      />
    </div>
  );
};

export default Article;
