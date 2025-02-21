const CommentList = ({ comments, onDeleteComment }) => {
  const currentUser = "tickle122";

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.comment_id}>
          <p>
            <strong>{comment.author}</strong> - (
            {new Date(comment.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            )
            {comment.author === currentUser ? (
              <button
                onClick={() => onDeleteComment(comment.comment_id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Delete
              </button>
            ) : null}
          </p>
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
