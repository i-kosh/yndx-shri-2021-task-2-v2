import { Entity } from "./types";
import { StoryData } from "./stories";
interface ISprint {
    sprintId: number;
}
export default function prepareData(entities?: Entity[], selected?: ISprint): StoryData;
export { prepareData };
