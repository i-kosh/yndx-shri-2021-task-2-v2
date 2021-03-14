import { Commit, Sprint, CommitId, SprintId, Summary, SummaryId } from "./types";
import { Slide, DiagramData } from "./stories";
export default function createDiagram(currentSprint?: Sprint, sprints?: Map<SprintId, Sprint>, commits?: Map<CommitId, Commit>, summarys?: Map<SummaryId, Summary>): Slide<DiagramData>;
export { createDiagram };
