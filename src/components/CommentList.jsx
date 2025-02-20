const CommentList = ({ comments }) => {
  return (
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
  );
};

export default CommentList;
