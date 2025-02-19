import { useState, useEffect } from "react";
import { fetchComments } from "../utils/api";

const CommentSection = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  if (isLoading) return <p>Loading comments...</p>;
  if (comments.length === 0)
    return <p>No comments yet. Be the first to comment!</p>;

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p>
              <strong>{comment.author}</strong> - (
              {new Date(comment.created_at).toLocaleDateString()})
            </p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
