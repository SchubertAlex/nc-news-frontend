import axios from "axios";

const api = "https://backend-news-project-mdgt.onrender.com/api";

const fetchArticles = ({ topicFilter = "" }) => {
  const params = {
    sort_by: "created_at",
    order: "desc",
  };
  if (topicFilter) {
    params.topic = topicFilter;
  }

  return axios
    .get(`${api}/articles`, { params })
    .then((response) => response.data.articles)
    .catch((error) => {
      console.error("Error fetching articles:", error);
      return [];
    });
};

const fetchTopics = () => {
  return axios
    .get(`${api}/topics`)
    .then((response) => response.data.topics)
    .catch((error) => {
      console.error("Error fetching topics:", error);
      return [];
    });
};

const updateVotes = (articleId, vote) => {
  return axios
    .patch(`${api}/articles/${articleId}`, { inc_votes: vote })
    .then((response) => response.data.article)
    .catch((error) => {
      console.error("Error updating votes:", error);
      throw error;
    });
};

const fetchArticle = (article_id) => {
  return axios
    .get(`${api}/articles/${article_id}`)
    .then((response) => response.data.article)
    .catch((error) => {
      console.error("Error fetching article:", error);
      throw error;
    });
};

const fetchComments = (article_id) => {
  return axios
    .get(`${api}/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments || [];
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
      return [];
    });
};

const postComment = (article_id, newComment) => {
  return axios
    .post(`${api}/articles/${article_id}/comments`, newComment)
    .then((response) => response.data.comment)
    .catch((error) => {
      console.error("Error posting comment:", error);
      throw error;
    });
};

const deleteComment = (comment_id) => {
  return axios
    .delete(`${api}/comments/${comment_id}`)
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      console.error("Error deleting comment:", error);
      throw error;
    });
};

export {
  fetchArticles,
  fetchTopics,
  updateVotes,
  fetchArticle,
  fetchComments,
  postComment,
  deleteComment,
};
