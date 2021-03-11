import {
  Entity,
  Project,
  User,
  Issue,
  Comment,
  Commit,
  Summary,
  Sprint,
} from "../types";

export function isProject(item: Entity): item is Project {
  return item.type === "Project";
}

export function isUser(item: Entity): item is User {
  return item.type === "User";
}

export function isIssue(item: Entity): item is Issue {
  return item.type === "Issue";
}

export function isComment(item: Entity): item is Comment {
  return item.type === "Comment";
}

export function isCommit(item: Entity): item is Commit {
  return item.type === "Commit";
}

export function isSummary(item: Entity): item is Summary {
  return item.type === "Summary";
}

export function isSprint(item: Entity): item is Sprint {
  return item.type === "Sprint";
}

export default {
  isProject,
  isUser,
  isIssue,
  isComment,
  isCommit,
  isSummary,
  isSprint,
};
