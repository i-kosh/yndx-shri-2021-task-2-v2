import { Entity } from "../types";
import {
  isProject,
  isComment,
  isCommit,
  isIssue,
  isSprint,
  isSummary,
  isUser,
} from "./predicates";

describe("предикаты типов работают правильно", () => {
  test("предикат isProject работает правильно", () => {
    expect(
      isProject({
        type: "Project",
      } as Entity)
    ).toEqual(true);
  });

  test("предикат isComment работает правильно", () => {
    expect(
      isComment({
        type: "Comment",
      } as Entity)
    ).toEqual(true);
  });

  test("предикат isCommit работает правильно", () => {
    expect(
      isCommit({
        type: "Commit",
      } as Entity)
    ).toEqual(true);
  });

  test("предикат isIssue работает правильно", () => {
    expect(
      isIssue({
        type: "Issue",
      } as Entity)
    ).toEqual(true);
  });

  test("предикат isSprint работает правильно", () => {
    expect(
      isSprint({
        type: "Sprint",
      } as Entity)
    ).toEqual(true);
  });

  test("предикат isSummary работает правильно", () => {
    expect(
      isSummary({
        type: "Summary",
      } as Entity)
    ).toEqual(true);
  });

  test("предикат isUser работает правильно", () => {
    expect(
      isUser({
        type: "User",
      } as Entity)
    ).toEqual(true);
  });
});
