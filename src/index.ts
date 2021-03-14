import { Entity } from "./types";
import { StoryData } from "./stories";
import parseEntitis from "./parseEntitis";
import { createDiagram } from "./createDiagram";
import { createLeaders } from "./createLeaders";
import { createVote } from "./createVote";
import { createChart } from "./createChart";
import { createActivity } from "./createActivity";

interface ISprint {
  sprintId: number;
}

export default function prepareData(
  entities: Entity[] = [],
  selected: ISprint = {
    sprintId: 0,
  }
): StoryData {
  const {
    parsed: { comments, commits, sprints, summarys, users },
    currentSprint,
  } = parseEntitis(entities, selected.sprintId);

  const leadersSlide = createLeaders(currentSprint, commits, users);
  const voteSlide = createVote(currentSprint, comments, users);
  const chartSlide = createChart(
    currentSprint,
    leadersSlide.data.users,
    sprints,
    commits
  );
  const diagramSlide = createDiagram(currentSprint, sprints, commits, summarys);
  const activitySlide = createActivity(currentSprint, commits);

  return [leadersSlide, voteSlide, chartSlide, diagramSlide, activitySlide];
}

export { prepareData };

// export function _test() {
//   const thisWindow: any = window;

//   const result = prepareData(thisWindow._data_, { sprintId: 977 });

//   console.log(result);
// }
