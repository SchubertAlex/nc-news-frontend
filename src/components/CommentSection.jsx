import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchComments, postComment, deleteComment } from "../utils/api";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentSection = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = "tickle122";

  useEffect(() => {
    setIsLoading(true);
    fetchComments(article_id)
      .then((commentsData) => {
        // Sort comments by created_at, newest first
        const sortedComments = commentsData.toSorted(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setComments(sortedComments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setIsLoading(false);
      });
  }, [article_id]);

  const postCommentHandler = (newCommentBody) => {
    const optimisticComment = {
      // Optimistic comment used by frontend mimics actual comment in backend DB:
      comment_id: `temp-id-${Date.now()}`,
      body: newCommentBody,
      author: currentUser,
      article_id: Number(article_id),
      votes: 0,
      created_at: new Date().toISOString(),
    };
    setComments((prevComments) => [optimisticComment, ...prevComments]);

    const commentPayload = { username: currentUser, body: newCommentBody };
    postComment(article_id, commentPayload)
      .then((postedComment) => {
        setComments((prevComments) => {
          // Replace optimistic comment with actual posted comment in backend DB:
          const updatedComments = prevComments.map((comment) =>
            comment.comment_id === optimisticComment.comment_id
              ? postedComment
              : comment
          );
          return updatedComments;
        });
      })
      .catch(() => {
        // Remove optimistic comment from UI if posting to DB in backend fails:
        setComments((prevComments) =>
          prevComments.filter(
            (comment) => comment.comment_id !== optimisticComment.comment_id
          )
        );
      });
  };

  const deleteCommentHandler = (commentIdToDelete) => {
    const commentId = Number(commentIdToDelete); // Ensure numeric

    const commentToDelete = comments.find(
      (comment) => comment.comment_id === commentId
    );

    // Check if current user owns the comment
    if (commentToDelete.author === currentUser) {
      // Optimistic update: Remove comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );

      // Call backend
      deleteComment(commentId)
        .then(() => {
          // Success: 204
        })
        .catch(() => {
          // Revert on failure
          setComments((prevComments) => {
            const revertedComments = [commentToDelete, ...prevComments];
            return revertedComments.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
          });
        });
    }
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (comments.length === 0)
    return (
      <div className="comments-section">
        <h3>Comments</h3>
        <CommentForm onPostComment={postCommentHandler} />
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <CommentForm onPostComment={postCommentHandler} />

      <CommentList comments={comments} onDeleteComment={deleteCommentHandler} />
    </div>
  );
};

export default CommentSection;
