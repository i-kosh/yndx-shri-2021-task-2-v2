import { Commit, Sprint, CommitId, SprintId } from "./types";
import { Slide, ChartData, User } from "./stories";
export default function createChart(currentSprint?: Sprint, users?: User[], sprints?: Map<SprintId, Sprint>, commits?: Map<CommitId, Commit>): Slide<ChartData>;
export { createChart };
