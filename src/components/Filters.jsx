import React from "react";

const Filters = ({ topicFilter, onTopicChange, topics }) => {
  return (
    <div>
      <select
        onChange={(e) => onTopicChange(e.target.value)}
        value={topicFilter}
      >
        <option value="">All Topics</option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {topic.slug}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
