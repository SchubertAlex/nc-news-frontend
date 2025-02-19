import React from "react";
import Button from "./Button";

const VotingCard = ({ votes, userVote, onVote }) => {
  return (
    <div className="voting-card">
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

export default VotingCard;
