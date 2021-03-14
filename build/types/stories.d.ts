export declare type TemplateAlias = "leaders" | "vote" | "chart" | "diagram" | "activity";
/** Участник команды */
export declare type User = {
    id: number;
    name: string;
    avatar: string;
    valueText: string;
};
/** Общие поля для всех шаблонов */
export declare type Template = {
    title: string;
    subtitle: string;
};
/** Формат данных для шаблона leaders */
export declare type LeadersData = Template & {
    emoji: string;
    users: User[];
};
/** Формат данных для шаблона vote */
export declare type VoteData = Template & {
    emoji: string;
    users: User[];
};
/** Формат данных для шаблона chart */
export declare type ChartData = Template & {
    values: {
        title: string;
        hint?: string;
        value: number;
        active?: boolean;
    }[];
    users: User[];
};
/** Формат данных для шаблона diagram */
export declare type DiagramData = Template & {
    totalText: string;
    differenceText: string;
    categories: {
        title: string;
        valueText: string;
        differenceText: string;
    }[];
};
/** Формат данных для шаблона activity */
export declare type ActivityData = Template & {
    data: {
        mon: number[];
        tue: number[];
        wed: number[];
        thu: number[];
        fri: number[];
        sat: number[];
        sun: number[];
    };
};
export declare type TemplateData = LeadersData | VoteData | ActivityData | DiagramData | ChartData;
export declare type Slide<T extends TemplateData> = {
    alias: TemplateAlias;
    data: T;
};
export declare type StoryData = Slide<TemplateData>[];
