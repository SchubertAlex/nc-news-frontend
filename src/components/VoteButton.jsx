import React from "react";
import Button from "./Button";

const VoteButton = ({ votes, userVote, onVote }) => {
  return (
    <div className="vote-button">
      <Button
        onClick={() => onVote(1)}
        className={userVote === 1 ? "active" : ""}
        ariaLabel="Upvote"
      >
        ↑
      </Button>
      <span>{votes}</span>
      <Button
        onClick={() => onVote(-1)}
        className={userVote === -1 ? "active" : ""}
        ariaLabel="Downvote"
      >
        ↓
      </Button>
    </div>
  );
};

export default VoteButton;
