import { Entity, Commit, Comment, Issue, Project, Sprint, Summary, User, CommentId, CommitId, IssueId, SprintId, ProjectId, SummaryId, UserId } from "./types";
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
declare const parseEntitis: (entities: Entity[], currentSprintId?: number | undefined) => IReturnData;
export default parseEntitis;
export { parseEntitis };
