import axios from "axios";

const api = "https://backend-news-project-mdgt.onrender.com/api";

const fetchArticles = ({ topicFilter = "" }) => {
  let url = `${api}/articles?sort_by=created_at&order=desc`;
  if (topicFilter) {
    url += `&topic=${topicFilter}`;
  }

  return axios
    .get(url)
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

export { fetchArticles, fetchTopics, updateVotes, fetchArticle };
