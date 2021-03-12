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
} from "./stories";
import { noun } from "plural-ru";

interface ISprint {
  sprintId: number;
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
      valueText: `${likesCount} ${noun(
        likesCount,
        "голос",
        "голоса",
        "голосов"
      )}`,
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

  return [leadersSlide, voteSlide, chartSlide];
}

export { prepareData };

// export function _test() {
//   const thisWindow: any = window;

//   console.time("test");
//   console.log(prepareData(thisWindow._data_, { sprintId: 977 }));
//   console.timeEnd("test");
// }
