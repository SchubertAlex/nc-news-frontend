import React, { useEffect, useState } from "react";
import { fetchArticles, fetchTopics, updateVotes } from "../utils/api";

import Header from "../components/Header";
import Filters from "../components/Filters";
import ArticleList from "../components/ArticleList";

const Homepage = () => {
  const [topicFilter, setTopicFilter] = useState("");
  const [topics, setTopics] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [voted, setVoted] = useState(() => {
    const savedVotes = localStorage.getItem("userVotes");
    return savedVotes ? JSON.parse(savedVotes) : {};
  });
  const [loading, setLoading] = useState(true);

  // Fetch articles and topics
  useEffect(() => {
    fetchArticles({ topicFilter }).then((data) => {
      const articlesWithVotes = data.map((article) => ({
        ...article,
        userVote: voted[article.article_id] || 0,
      }));
      setArticleList(articlesWithVotes);
      setLoading(false);
    });

    fetchTopics().then((data) => {
      setTopics(data);
    });
  }, [topicFilter]);

  // Save votes to localStorage
  useEffect(() => {
    localStorage.setItem("userVotes", JSON.stringify(voted));
  }, [voted]);

  // Handle voting
  const handleVote = (articleId, vote) => {
    const currentVote = voted[articleId] || 0;

    if (currentVote === vote) return;

    let newVote;
    if (currentVote === -vote) {
      newVote = 0;
    } else {
      newVote = vote;
    }

    const voteDifference = newVote - currentVote;

    updateVotes(articleId, voteDifference)
      .then((updatedArticle) => {
        const updatedArticleWithComments = {
          ...updatedArticle,
          comment_count:
            articleList.find((article) => article.article_id === articleId)
              ?.comment_count || 0,
        };

        setArticleList((prevArticles) =>
          prevArticles.map((article) =>
            article.article_id === articleId
              ? { ...article, ...updatedArticleWithComments, userVote: newVote }
              : article
          )
        );

        setVoted((prevVoted) => ({
          ...prevVoted,
          [articleId]: newVote,
        }));
      })
      .catch((error) => {
        console.error("Failed to update vote:", error);
      });
  };

  return (
    <div>
      <Header />

      <Filters
        topicFilter={topicFilter}
        onTopicChange={setTopicFilter}
        topics={topics}
      />

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <ArticleList articles={articleList} handleVote={handleVote} />
      )}
    </div>
  );
};

export default Homepage;
