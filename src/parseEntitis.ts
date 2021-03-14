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

export interface IParsedEntitis {
  commits: Map<CommitId, Commit>;
  users: Map<UserId, User>;
  sprints: Map<SprintId, Sprint>;
  projects: Map<ProjectId, Project>;
  issues: Map<IssueId, Issue>;
  comments: Map<CommentId, Comment>;
  summarys: Map<SummaryId, Summary>;
}

export interface IReturnData {
  parsed: IParsedEntitis;
  currentSprint?: Sprint;
}

const addToMap = <T extends K["id"], K extends Entity>(
  mapFrom: Map<T, K>,
  mapTo: Map<T, K>
) => {
  mapFrom.forEach((entity) => {
    const key = entity.id as T;

    if (!mapTo.has(key)) {
      mapTo.set(key, entity);
    }
  });
};

const parseEntitis = (
  entities: Entity[],
  currentSprintId?: SprintId
): IReturnData => {
  const commits: IParsedEntitis["commits"] = new Map();
  const users: IParsedEntitis["users"] = new Map();
  const sprints: IParsedEntitis["sprints"] = new Map();
  const projects: IParsedEntitis["projects"] = new Map();
  const issues: IParsedEntitis["issues"] = new Map();
  const comments: IParsedEntitis["comments"] = new Map();
  const summarys: IParsedEntitis["summarys"] = new Map();

  let currentSprint: Sprint | undefined;

  entities.forEach((entity) => {
    switch (entity.type) {
      case "Commit":
        if (!commits.has(entity.id)) {
          commits.set(entity.id, entity);

          if (typeof entity.author !== "number") {
            addToMap(parseEntitis([entity.author]).parsed.users, users);
          }

          if (!Array.isArray(entity.summaries)) {
            addToMap(
              parseEntitis([entity.summaries]).parsed.summarys,
              summarys
            );
          }
        }
        break;
      case "Comment":
        if (!comments.has(entity.id)) {
          comments.set(entity.id, entity);

          if (typeof entity.author !== "number") {
            addToMap(parseEntitis([entity.author]).parsed.users, users);
          }

          entity.likes.forEach((userOrId) => {
            if (typeof userOrId !== "number") {
              addToMap(parseEntitis([userOrId]).parsed.users, users);
            }
          });
        }
        break;
      case "Issue":
        if (!issues.has(entity.id)) {
          issues.set(entity.id, entity);

          if (entity.resolvedBy && typeof entity.resolvedBy !== "number") {
            addToMap(parseEntitis([entity.resolvedBy]).parsed.users, users);
          }

          entity.comments.forEach((commentOrID) => {
            if (typeof commentOrID !== "string") {
              addToMap(parseEntitis([commentOrID]).parsed.comments, comments);
            }
          });
        }
        break;
      case "Project":
        if (!projects.has(entity.id)) {
          projects.set(entity.id, entity);

          entity.commits.forEach((commitOrID) => {
            if (typeof commitOrID !== "string") {
              addToMap(parseEntitis([commitOrID]).parsed.commits, commits);
            }
          });

          entity.issues.forEach((issueOrID) => {
            if (typeof issueOrID !== "string") {
              addToMap(parseEntitis([issueOrID]).parsed.issues, issues);
            }
          });

          entity.dependencies.forEach((projectOrID) => {
            if (typeof projectOrID !== "string") {
              addToMap(parseEntitis([projectOrID]).parsed.projects, projects);
            }
          });
        }
        break;
      case "Sprint":
        if (!sprints.has(entity.id)) {
          sprints.set(entity.id, entity);
        }

        if (
          !currentSprint &&
          currentSprintId &&
          entity.id === currentSprintId
        ) {
          currentSprint = entity;
        }

        break;
      case "User":
        if (!users.has(entity.id)) {
          users.set(entity.id, entity);

          entity.friends.forEach((userOrID) => {
            if (typeof userOrID !== "number") {
              addToMap(parseEntitis([userOrID]).parsed.users, users);
            }
          });

          if (entity.comments) {
            entity.comments.forEach((commentOrID) => {
              if (typeof commentOrID !== "string") {
                addToMap(parseEntitis([commentOrID]).parsed.comments, comments);
              }
            });
          }

          if (entity.commits) {
            entity.commits.forEach((commitOrID) => {
              if (typeof commitOrID !== "string") {
                addToMap(parseEntitis([commitOrID]).parsed.commits, commits);
              }
            });
          }
        }
        break;
      case "Summary":
        if (!summarys.has(entity.id)) {
          summarys.set(entity.id, entity);

          if (entity.comments) {
            entity.comments.forEach((commentOrID) => {
              if (typeof commentOrID !== "string") {
                addToMap(parseEntitis([commentOrID]).parsed.comments, comments);
              }
            });
          }
        }
        break;
    }
  });

  return {
    parsed: {
      comments,
      commits,
      issues,
      projects,
      sprints,
      summarys,
      users,
    },
    currentSprint,
  };
};

export default parseEntitis;
export { parseEntitis };
