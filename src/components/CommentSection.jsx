import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchComments, postComment } from "../utils/api";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentSection = () => {
  const { article_id } = useParams();

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchComments(article_id)
      .then((commentsData) => {
        setComments(commentsData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setIsLoading(false);
      });
  }, [article_id]);

  const postCommentHandler = (newComment) => {
    console.log("postCommentHandler:", postCommentHandler);
    postComment(article_id, newComment)
      .then((postedComment) => {
        setComments((prevComments) => [postedComment, ...prevComments]);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (comments.length === 0)
    return <p>No comments yet. Be the first to comment!</p>;

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <CommentForm article_id={article_id} onNewComment={postCommentHandler} />
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;
