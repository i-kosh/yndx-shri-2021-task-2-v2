import { Commit, Sprint, User, CommitId, UserId } from "./types";
import { Slide, LeadersData } from "./stories";
export default function createLeaders(currentSprint?: Sprint, commits?: Map<CommitId, Commit>, users?: Map<UserId, User>): Slide<LeadersData>;
export { createLeaders };
