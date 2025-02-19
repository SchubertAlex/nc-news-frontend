import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticle } from "../utils/api";

import MainArticle from "../components/MainArticle";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle(article_id)
      .then((articleData) => {
        setArticle(articleData);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
      });
  }, [article_id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MainArticle article={article} />
    </div>
  );
};

export default ArticlePage;
