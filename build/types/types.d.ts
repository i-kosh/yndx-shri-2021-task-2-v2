/** UUID-like unique key */
export declare type UUID = string;
/** 32 or 40 chars */
export declare type HASH = string;
export declare type IssueId = HASH;
export declare type ProjectId = UUID;
export declare type CommentId = UUID;
export declare type CommitId = UUID;
export declare type UserId = number;
export declare type SprintId = number;
export declare type SummaryId = number;
/** Epoch in ms */
export declare type Timestamp = number;
/** Проект (пакет/сервис/репозиторий) */
export interface Project {
    id: ProjectId;
    type: "Project";
    name: string;
    dependencies: (Project | ProjectId)[];
    issues: (Issue | IssueId)[];
    commits: (Commit | CommitId)[];
}
/** Пользователь */
export interface User {
    id: UserId;
    type: "User";
    name: string;
    login: string;
    avatar: string;
    friends: (User | UserId)[];
    commits?: (Commit | CommitId)[];
    comments?: (Comment | CommentId)[];
}
/** Проблема */
export interface Issue {
    id: IssueId;
    type: "Issue";
    name: string;
    status: "open" | "inProgress" | "closed";
    resolution?: "fixed" | "cancelled" | "duplicate";
    resolvedBy?: User | UserId;
    comments: (Comment | CommentId)[];
    createdAt: Timestamp;
    finishedAt?: Timestamp;
}
/** Комментарий */
export interface Comment {
    id: CommentId;
    type: "Comment";
    author: User | UserId;
    message: string;
    likes: (User | UserId)[];
    createdAt: Timestamp;
}
/** Коммит */
export interface Commit {
    id: CommitId;
    type: "Commit";
    author: User | UserId;
    message: string;
    summaries: Summary | SummaryId[];
    timestamp: Timestamp;
}
/** Файл внутри коммита ? */
export interface Summary {
    id: SummaryId;
    type: "Summary";
    path: string;
    added: number;
    removed: number;
    comments?: (Comment | CommentId)[];
}
/** Спринт */
export interface Sprint {
    id: SprintId;
    type: "Sprint";
    name: string;
    startAt: Timestamp;
    finishAt: Timestamp;
}
export declare type Entity = Project | User | Issue | Comment | Commit | Summary | Sprint;
export declare type EntityId = Entity["id"];
export declare type EntityType = Entity["type"];
