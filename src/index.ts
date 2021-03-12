import {
  Entity,
  Commit,
  Comment,
  Issue,
  Project,
  Sprint,
  Summary,
  User,
  CommentId,
  CommitId,
  IssueId,
  SprintId,
  ProjectId,
  SummaryId,
  UserId,
} from "./types";
import {
  StoryData,
  Slide,
  LeadersData,
  VoteData,
  ChartData,
  User as SlideUser,
  DiagramData,
} from "./stories";

import getPlural from "./utils/getPlural";

interface ISprint {
  sprintId: number;
}

function withLeadingSign(val: number): string {
  return val >= 0 ? `+${val}` : `${val}`;
}

function createLeaders(
  currentSprint?: Sprint,
  commits?: Map<CommitId, Commit>,
  users?: Map<UserId, User>
): Slide<LeadersData> {
  const sprintName = currentSprint?.name || "";

  const leaders: Slide<LeadersData> = {
    alias: "leaders",
    data: {
      title: "Больше всего коммитов",
      subtitle: `${sprintName}`,
      emoji: "👑",
      users: [],
    },
  };

  const usersMap: Map<User, Set<Commit>> = new Map();

  if (currentSprint && commits && users) {
    commits.forEach((commit) => {
      if (
        commit.timestamp >= currentSprint.startAt &&
        commit.timestamp <= currentSprint.finishAt
      ) {
        const author =
          typeof commit.author !== "number"
            ? commit.author
            : users.get(commit.author);
        if (!author) {
          console.warn("автор не найден");
          return;
        }

        const usersMapEntry = usersMap.get(author);

        if (!usersMapEntry) {
          const set: Set<Commit> = new Set();
          usersMap.set(author, set.add(commit));
        } else {
          usersMapEntry.add(commit);
        }
      }
    });
  }

  for (const val of usersMap) {
    const user = val[0];
    const commitsSet = val[1];

    leaders.data.users.push({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      valueText: `${commitsSet.size}`,
    });
  }

  leaders.data.users.sort((a, b) => {
    const verdict1 = parseInt(b.valueText) - parseInt(a.valueText);

    if (verdict1 === 0) {
      return a.id - b.id;
    }

    return verdict1;
  });

  return leaders;
}

function createVote(
  currentSprint?: Sprint,
  comments?: Map<CommentId, Comment>,
  users?: Map<UserId, User>
): Slide<VoteData> {
  const sprintName = currentSprint?.name || "";

  const slide: Slide<VoteData> = {
    alias: "vote",
    data: {
      title: "Самый 🔎 внимательный разработчик",
      emoji: "🔎",
      subtitle: sprintName,
      users: [],
    },
  };

  const usersMap: Map<User, number> = new Map();

  if (currentSprint && comments && users) {
    comments.forEach((comment) => {
      if (
        comment.createdAt >= currentSprint.startAt &&
        comment.createdAt <= currentSprint.finishAt
      ) {
        const author =
          typeof comment.author !== "number"
            ? comment.author
            : users.get(comment.author);
        if (!author) {
          console.warn("автор не найден");
          return;
        }

        const currentLikesCount = usersMap.get(author);
        usersMap.set(author, (currentLikesCount || 0) + comment.likes.length);
      }
    });
  }

  for (const val of usersMap) {
    const user = val[0];
    const likesCount = val[1];

    slide.data.users.push({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      valueText: `${likesCount} ${getPlural(likesCount, [
        "голос",
        "голоса",
        "голосов",
      ])}`,
    });
  }

  slide.data.users.sort(
    (a, b) => parseInt(b.valueText) - parseInt(a.valueText)
  );

  return slide;
}

function createChart(
  currentSprint?: Sprint,
  users?: SlideUser[],
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

function createDiagram(
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

  let prevSprint: Sprint | undefined;
  if (currentSprint && sprints && commits) {
    sprints.forEach((sprint) => {
      if (sprint.finishAt <= currentSprint.startAt) {
        if (!prevSprint) {
          prevSprint = sprint;
          return;
        }

        if (prevSprint.startAt < sprint.startAt) {
          prevSprint = sprint;
        }
      }
    });

    const commitsInCurrent: Commit[] = [];
    const commitsInPrev: Commit[] = [];

    interface ICategory {
      title: string;
      min: number;
      max: number;
      currentCommitsCount: number;
      prevCommitsCount: number;
    }

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

    const putInCategory = (
      categories: ICategory[],
      commit: Commit,
      inPrev?: boolean
    ): ICategory[] => {
      let size = 0;
      if (Array.isArray(commit.summaries)) {
        commit.summaries.forEach((summaryId) => {
          const summary = summarys?.get(summaryId);
          size += (summary?.added || 0) + (summary?.removed || 0);
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
    };

    commits.forEach((commit) => {
      if (
        commit.timestamp <= currentSprint.finishAt &&
        commit.timestamp >= currentSprint.startAt
      ) {
        commitsInCurrent.push(commit);
        putInCategory(categories, commit);
      }
      if (
        prevSprint &&
        commit.timestamp <= prevSprint.finishAt &&
        commit.timestamp >= prevSprint.startAt
      ) {
        commitsInPrev.push(commit);
        putInCategory(categories, commit, true);
      }
    });

    slide.data.totalText = `${commitsInCurrent.length} ${getPlural(
      commitsInCurrent.length,
      commitsPlurals
    )}`;

    const totalDiff = commitsInCurrent.length - commitsInPrev.length;
    slide.data.differenceText = `${withLeadingSign(totalDiff)} ${getPlural(
      totalDiff,
      commitsPlurals
    )}`;

    categories.forEach((category) => {
      const sizeDiff = category.currentCommitsCount - category.prevCommitsCount;

      slide.data.categories.push({
        title: category.title,
        valueText: `${category.currentCommitsCount} ${getPlural(
          category.currentCommitsCount,
          commitsPlurals
        )}`,
        differenceText: `${withLeadingSign(sizeDiff)} ${getPlural(
          Math.abs(sizeDiff),
          commitsPlurals
        )}`,
      });
    });
  }

  return slide;
}

export default function prepareData(
  entities: Entity[],
  selected: ISprint
): StoryData {
  const commits: Map<CommitId, Commit> = new Map();
  const users: Map<UserId, User> = new Map();
  const sprints: Map<SprintId, Sprint> = new Map();
  const projects: Map<ProjectId, Project> = new Map();
  const issues: Map<IssueId, Issue> = new Map();
  const comments: Map<CommentId, Comment> = new Map();
  const summarys: Map<SummaryId, Summary> = new Map();

  entities.forEach((entity) => {
    switch (entity.type) {
      case "Commit":
        commits.set(entity.id, entity);
        break;
      case "Comment":
        comments.set(entity.id, entity);
        break;
      case "Issue":
        issues.set(entity.id, entity);
        break;
      case "Project":
        projects.set(entity.id, entity);
        break;
      case "Sprint":
        sprints.set(entity.id, entity);
        break;
      case "User":
        users.set(entity.id, entity);
        break;
      case "Summary":
        summarys.set(entity.id, entity);
        break;
    }
  });

  let currentSprint: Sprint | undefined = undefined;

  for (const val of sprints) {
    const id = val[0];
    const sprint = val[1];

    if (id === selected.sprintId) {
      currentSprint = sprint;
      break;
    }
  }

  const leadersSlide = createLeaders(currentSprint, commits, users);
  const voteSlide = createVote(currentSprint, comments, users);
  const chartSlide = createChart(
    currentSprint,
    leadersSlide.data.users,
    sprints,
    commits
  );
  const diagramSlide = createDiagram(currentSprint, sprints, commits, summarys);

  return [leadersSlide, voteSlide, chartSlide, diagramSlide];
}

export { prepareData };

// export function _test() {
//   const thisWindow: any = window;

//   console.time("test");
//   console.log(prepareData(thisWindow._data_, { sprintId: 977 }));
//   console.timeEnd("test");
// }
