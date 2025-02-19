import React from "react";
import Button from "./Button";

const VotingCard = ({ votes, userVote, onVote }) => {
  return (
    <div className="voting-card">
      <Button
        onClick={() => onVote(1)}
        className={userVote === 1 ? "active" : ""}
        disabled={userVote === 1} // Disable the upvote button if the user has already voted up
        ariaLabel="Upvote"
      >
        ↑
      </Button>
      <span>{votes}</span>
      <Button
        onClick={() => onVote(-1)}
        className={userVote === -1 ? "active" : ""}
        disabled={userVote === -1} // Disable the downvote button if the user has already voted down
        ariaLabel="Downvote"
      >
        ↓
      </Button>
    </div>
  );
};

export default VotingCard;
