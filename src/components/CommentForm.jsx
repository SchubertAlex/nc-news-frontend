import { useState } from "react";

const CommentForm = ({ onPostComment }) => {
  const [commentBody, setCommentBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;

    onPostComment(commentBody);
    setCommentBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder="Write your comment here..."
      />
      <br />
      <button type="submit" disabled={!commentBody.trim()}>
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
