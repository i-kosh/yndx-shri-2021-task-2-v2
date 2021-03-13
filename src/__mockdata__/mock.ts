import {
  Commit,
  Comment,
  Sprint,
  User,
  Summary,
  Issue,
  Project,
} from "../types";
import * as faker from "faker";

faker.setLocale("ru");

export const mockCommitEntity = (): Commit => {
  return {
    id: faker.random.alpha({ count: 10 }),
    author: faker.random.number({ min: 1, max: 100 }),
    message: faker.lorem.words(10),
    summaries: [],
    timestamp: faker.date.past(3).valueOf(),
    type: "Commit",
  };
};

export const mockCommentEntity = (): Comment => {
  return {
    id: faker.random.alpha({ count: 10 }),
    author: faker.random.number({ min: 1, max: 100 }),
    likes: [],
    type: "Comment",
    message: faker.lorem.words(10),
    createdAt: faker.date.past(3).valueOf(),
  };
};

export const mockSprintEntity = (): Sprint => {
  const ONE_WEEK = 604_800_000;

  const date = faker.date.past().valueOf();

  return {
    type: "Sprint",
    id: faker.random.number({ min: 1, max: 1000 }),
    name: faker.name.title(),
    startAt: date,
    finishAt: date + ONE_WEEK,
  };
};

export const mockUserEntity = (): User => {
  return {
    type: "User",
    name: faker.name.findName() + faker.name.lastName(),
    avatar: `${faker.random.number({ min: 1, max: 100 })}.jpg`,
    id: faker.random.number({ min: 1, max: 100 }),
    login: faker.random.alpha({ count: 15 }),
    friends: [],
    comments: [],
    commits: [],
  };
};

export const mockSummaryEntity = (): Summary => {
  return {
    type: "Summary",
    id: faker.random.number({ min: 1, max: 100 }),
    path: faker.git.commitEntry(),
    added: faker.random.number(3000),
    removed: faker.random.number(3000),
    comments: [],
  };
};

export const mockIssueEntity = (): Issue => {
  const statuses: Array<Issue["status"]> = ["open", "inProgress", "closed"];

  return {
    type: "Issue",
    id: faker.random.alpha({ count: 15 }),
    name: faker.name.title(),
    comments: [],
    status: statuses[faker.random.number({ min: 0, max: 2 })],
    createdAt: faker.date.past(1).valueOf(),
  };
};

export const mockProjectEntity = (): Project => {
  return {
    type: "Project",
    id: faker.random.alpha({ count: 15 }),
    name: faker.name.title(),
    dependencies: [],
    commits: [],
    issues: [],
  };
};
