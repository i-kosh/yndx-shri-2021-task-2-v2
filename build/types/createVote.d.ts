import { Comment, Sprint, User, CommentId, UserId } from "./types";
import { Slide, VoteData } from "./stories";
export default function createVote(currentSprint?: Sprint, comments?: Map<CommentId, Comment>, users?: Map<UserId, User>): Slide<VoteData>;
export { createVote };
