import { useParams } from "react-router-dom";
import Article from "../components/Article";
import CommentSection from "../components/CommentSection";

const ArticlePage = () => {
  const { article_id } = useParams();

  return (
    <div>
      <Article article_id={article_id} />
      <hr />
      <CommentSection article_id={article_id} />
    </div>
  );
};

export default ArticlePage;
