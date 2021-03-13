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

interface IParsedEntitis {
  commits: Map<CommitId, Commit>;
  users: Map<UserId, User>;
  sprints: Map<SprintId, Sprint>;
  projects: Map<ProjectId, Project>;
  issues: Map<IssueId, Issue>;
  comments: Map<CommentId, Comment>;
  summarys: Map<SummaryId, Summary>;
}

interface IReturnData {
  parsed: IParsedEntitis;
  currentSprint?: Sprint;
}

const parseEntitis = (
  entities: Entity[],
  currentSprintId?: SprintId
): IReturnData => {
  const parsed: IParsedEntitis = {
    commits: new Map(),
    users: new Map(),
    sprints: new Map(),
    projects: new Map(),
    issues: new Map(),
    comments: new Map(),
    summarys: new Map(),
  };

  let currentSprint: Sprint | undefined;

  entities.forEach((entity) => {
    switch (entity.type) {
      case "Commit":
        parsed.commits.set(entity.id, entity);
        break;
      case "Comment":
        parsed.comments.set(entity.id, entity);
        break;
      case "Issue":
        parsed.issues.set(entity.id, entity);
        break;
      case "Project":
        parsed.projects.set(entity.id, entity);
        break;
      case "Sprint":
        parsed.sprints.set(entity.id, entity);

        if (
          !currentSprint &&
          currentSprintId &&
          entity.id === currentSprintId
        ) {
          currentSprint = entity;
        }

        break;
      case "User":
        parsed.users.set(entity.id, entity);
        break;
      case "Summary":
        parsed.summarys.set(entity.id, entity);
        break;
    }
  });

  return { parsed, currentSprint };
};

export default parseEntitis;
export { parseEntitis };
