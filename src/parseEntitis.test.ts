import { parseEntitis, IParsedEntitis } from "./parseEntitis";
import {
  mockUserEntity,
  mockCommitEntity,
  mockCommentEntity,
  mockSprintEntity,
  mockSummaryEntity,
  mockIssueEntity,
  mockProjectEntity,
} from "./__mockdata__/mock";

describe("Разбирает сущности", () => {
  const testCommit = mockCommitEntity();
  const commits = [mockCommitEntity(), testCommit, mockCommitEntity()];
  const testUser = mockUserEntity();
  const users = [mockUserEntity(), testUser, mockUserEntity()];
  const testComment = mockCommentEntity();
  const comments = [mockCommentEntity(), testComment, mockCommentEntity()];
  const testSprint = mockSprintEntity();
  const sprints = [mockSprintEntity(), testSprint, mockSprintEntity()];
  const testSummary = mockSummaryEntity();
  const summarys = [mockSummaryEntity(), testSummary, mockSummaryEntity()];
  const testProject = mockProjectEntity();
  const projects = [mockProjectEntity(), testProject, mockProjectEntity()];
  const testIssue = mockIssueEntity();
  const issues = [mockIssueEntity(), testIssue, mockIssueEntity()];

  it("возвращает все виды сущностей", () => {
    expect(parseEntitis([]).parsed).toMatchObject<IParsedEntitis>({
      comments: expect.any(Map),
      commits: expect.any(Map),
      issues: expect.any(Map),
      projects: expect.any(Map),
      sprints: expect.any(Map),
      summarys: expect.any(Map),
      users: expect.any(Map),
    });
  });
  it("commits", () => {
    expect(
      parseEntitis(commits).parsed.commits.get(testCommit.id)
    ).toMatchObject(testCommit);
  });

  it("users", () => {
    expect(parseEntitis(users).parsed.users.get(testUser.id)).toMatchObject(
      testUser
    );
  });

  it("comments", () => {
    expect(
      parseEntitis(comments).parsed.comments.get(testComment.id)
    ).toMatchObject(testComment);
  });

  it("sprints", () => {
    expect(
      parseEntitis(sprints).parsed.sprints.get(testSprint.id)
    ).toMatchObject(testSprint);
  });

  it("summarys", () => {
    expect(
      parseEntitis(summarys).parsed.summarys.get(testSummary.id)
    ).toMatchObject(testSummary);
  });

  it("issue", () => {
    expect(parseEntitis(issues).parsed.issues.get(testIssue.id)).toMatchObject(
      testIssue
    );
  });

  it("projects", () => {
    expect(
      parseEntitis(projects).parsed.projects.get(testProject.id)
    ).toMatchObject(testProject);
  });
});

describe("Находит текущий спринт", () => {
  const currentSprint = mockSprintEntity();
  const sprints = [
    mockSprintEntity(),
    mockSprintEntity(),
    mockSprintEntity(),
    mockSprintEntity(),
    mockSprintEntity(),
    currentSprint,
    mockSprintEntity(),
  ];

  it("возвращает undefined если НЕ был указан currentSprintId", () => {
    expect(parseEntitis(sprints).currentSprint).toBeUndefined();
  });

  it("возвращает undefined если НЕ был найден", () => {
    expect(parseEntitis(sprints, 2323232).currentSprint).toBeUndefined();
  });

  it("возвращает спринт если был указан currentSprintId", () => {
    expect(parseEntitis(sprints, currentSprint.id).currentSprint).toEqual(
      currentSprint
    );
  });
});
