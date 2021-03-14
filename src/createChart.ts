import { Commit, Sprint, CommitId, SprintId } from "./types";
import { Slide, ChartData, User } from "./stories";

export default function createChart(
  currentSprint?: Sprint,
  users?: User[],
  sprints?: Map<SprintId, Sprint>,
  commits?: Map<CommitId, Commit>
): Slide<ChartData> {
  const sprintName = currentSprint?.name || "";

  const slide: Slide<ChartData> = {
    alias: "chart",
    data: {
      subtitle: sprintName,
      title: "Коммиты",
      users: users || [],
      values: [],
    },
  };

  const sprintsMap: Map<Sprint, number> = new Map();

  if (currentSprint && sprints && commits) {
    commits.forEach((commit) => {
      for (const val of sprints) {
        const sprint = val[1];

        if (!sprintsMap.has(sprint)) {
          sprintsMap.set(sprint, 0);
        }

        if (
          commit.timestamp >= sprint.startAt &&
          commit.timestamp <= sprint.finishAt
        ) {
          const currentCommitsCount = sprintsMap.get(sprint) || 0;
          sprintsMap.set(sprint, currentCommitsCount + 1);
          break;
        }
      }
    });
  }

  for (const val of sprintsMap) {
    const sprint = val[0];
    const commitsCount = val[1];

    const obj: Slide<ChartData>["data"]["values"][0] = {
      title: `${sprint.id}`,
      value: commitsCount,
      hint: sprint.name,
    };

    if (currentSprint?.id === sprint.id) {
      obj.active = true;
    }

    slide.data.values.push(obj);
  }

  slide.data.values.sort((a, b) => parseInt(a.title) - parseInt(b.title));

  return slide;
}

export { createChart };
