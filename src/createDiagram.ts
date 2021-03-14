import {
  Commit,
  Sprint,
  CommitId,
  SprintId,
  Summary,
  SummaryId,
} from "./types";
import { Slide, DiagramData } from "./stories";
import { getPlural } from "./utils/getPlural";

interface ICategory {
  title: string;
  min: number;
  max: number;
  currentCommitsCount: number;
  prevCommitsCount: number;
}

function withLeadingSign(val: number): string {
  if (val === 0) return "0";
  return val > 0 ? `+${val}` : `${val}`;
}

function putInCategory(
  categories: ICategory[],
  commit: Commit,
  summarys?: Map<SummaryId, Summary>,
  inPrev?: boolean
): ICategory[] {
  let size = 0;
  if (Array.isArray(commit.summaries)) {
    commit.summaries.forEach((summaryId) => {
      const summary = summarys?.get(summaryId);

      if (summary) {
        size = size + summary.added + summary.removed;
      }
    });
  } else {
    size = commit.summaries.added + commit.summaries.removed;
  }

  for (const category of categories) {
    if (size >= category.min && size <= category.max) {
      inPrev ? category.prevCommitsCount++ : category.currentCommitsCount++;

      break;
    }
  }

  return categories;
}

export default function createDiagram(
  currentSprint?: Sprint,
  sprints?: Map<SprintId, Sprint>,
  commits?: Map<CommitId, Commit>,
  summarys?: Map<SummaryId, Summary>
): Slide<DiagramData> {
  const commitsPlurals: [string, string, string] = [
    "коммит",
    "коммита",
    "коммитов",
  ];
  const slide: Slide<DiagramData> = {
    alias: "diagram",
    data: {
      title: "Размер коммитов",
      subtitle: currentSprint?.name || "",
      totalText: "",
      differenceText: "",
      categories: [],
    },
  };

  const categories: ICategory[] = [
    {
      title: "> 1001 строки",
      min: 1001,
      max: Infinity,
      currentCommitsCount: 0,
      prevCommitsCount: 0,
    },
    {
      title: "501 — 1000 строк",
      min: 501,
      max: 1000,
      currentCommitsCount: 0,
      prevCommitsCount: 0,
    },
    {
      title: "101 — 500 строк",
      min: 101,
      max: 500,
      currentCommitsCount: 0,
      prevCommitsCount: 0,
    },
    {
      title: "1 — 100 строк",
      min: 1,
      max: 100,
      currentCommitsCount: 0,
      prevCommitsCount: 0,
    },
  ];

  if (currentSprint && sprints && commits) {
    const prevSprint = sprints.get(currentSprint.id - 1);

    const commitsInCurrent: Commit[] = [];
    const commitsInPrev: Commit[] = [];

    commits.forEach((commit) => {
      if (
        commit.timestamp <= currentSprint.finishAt &&
        commit.timestamp >= currentSprint.startAt
      ) {
        commitsInCurrent.push(commit);
        putInCategory(categories, commit, summarys);
      }
      if (
        prevSprint &&
        commit.timestamp <= prevSprint.finishAt &&
        commit.timestamp >= prevSprint.startAt
      ) {
        commitsInPrev.push(commit);
        putInCategory(categories, commit, summarys, true);
      }
    });

    slide.data.totalText = `${commitsInCurrent.length} ${getPlural(
      commitsInCurrent.length,
      commitsPlurals
    )}`;

    const totalDiff = commitsInCurrent.length - commitsInPrev.length;
    slide.data.differenceText = `${withLeadingSign(
      totalDiff
    )} с прошлого спринта`;
  }

  categories.forEach((category) => {
    const commitsCountDiff =
      category.currentCommitsCount - category.prevCommitsCount;

    slide.data.categories.push({
      title: category.title,
      valueText: `${category.currentCommitsCount} ${getPlural(
        category.currentCommitsCount,
        commitsPlurals
      )}`,
      differenceText: `${withLeadingSign(commitsCountDiff)} ${getPlural(
        commitsCountDiff,
        commitsPlurals
      )}`,
    });
  });

  return slide;
}

export { createDiagram };
