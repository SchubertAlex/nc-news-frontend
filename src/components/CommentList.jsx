const CommentList = ({ comments }) => {
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
          </p>
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
