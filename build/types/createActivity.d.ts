import { Commit, Sprint, CommitId } from "./types";
import { Slide, ActivityData } from "./stories";
export default function createActivity(currentSprint?: Sprint, commits?: Map<CommitId, Commit>): Slide<ActivityData>;
export { createActivity };
