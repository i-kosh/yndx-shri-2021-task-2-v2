import { Commit, Sprint, CommitId } from "./types";
import { Slide, ActivityData } from "./stories";

export default function createActivity(
  currentSprint?: Sprint,
  commits?: Map<CommitId, Commit>
): Slide<ActivityData> {
  const WEEK_DAYS: Array<keyof Slide<ActivityData>["data"]["data"]> = [
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
  ];
  const slide: Slide<ActivityData> = {
    alias: "activity",
    data: {
      title: "Коммиты, 1 неделя",
      subtitle: currentSprint?.name || "",
      data: {
        fri: new Array(24).fill(0),
        mon: new Array(24).fill(0),
        sat: new Array(24).fill(0),
        sun: new Array(24).fill(0),
        thu: new Array(24).fill(0),
        tue: new Array(24).fill(0),
        wed: new Array(24).fill(0),
      },
    },
  };

  if (currentSprint && commits) {
    commits.forEach((commit) => {
      if (
        commit.timestamp >= currentSprint.startAt &&
        commit.timestamp <= currentSprint.finishAt
      ) {
        const commitDate = new Date(commit.timestamp);

        const hour = commitDate.getHours();
        const weekDayNumber = commitDate.getDay();

        slide.data.data[WEEK_DAYS[weekDayNumber]][hour]++;
      }
    });
  }

  return slide;
}

export { createActivity };
