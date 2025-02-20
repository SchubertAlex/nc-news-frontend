import { useState } from "react";
import { postComment } from "../utils/api";

const CommentForm = ({ article_id, onNewComment }) => {
  const [commentBody, setCommentBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!commentBody) return;

    const newComment = {
      username: "tickle122",
      body: commentBody,
    };
    console.log("onNewComment prop:", onNewComment);

    postComment(article_id, newComment)
      .then((postedComment) => {
        onNewComment(postedComment);
        setCommentBody("");
      })
      .catch((error) => {
        console.error("Failed to post comment", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder="Write your comment here..."
      />
      <button type="submit" disabled={!commentBody}>
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
