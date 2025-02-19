import React from "react";

const CommentCount = ({ count }) => {
  return (
    <div className="comment-count">
      <span>{count}</span>
      <span>Comments</span>
    </div>
  );
};

export default CommentCount;
