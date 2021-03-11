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
import { StoryData, Slide, LeadersData } from "./stories";

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
      avatar: user.avatar,
      id: user.id,
      name: user.name,
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

  return [createLeaders(currentSprint, commits, users)];
}

export { prepareData };

// export function _test() {
//   const thisWindow: any = window;

//   console.time("test");
//   console.log(prepareData(thisWindow._data_, { sprintId: 977 }));
//   console.timeEnd("test");
// }
