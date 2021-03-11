import { Entity } from "./types";
import { StoryData } from "./stories";

interface ISprint {
  sprintId: number;
}

export default function prepareData(
  entities: Entity[],
  sprint: ISprint
): StoryData {
  entities.forEach((entity) => {});

  return [];
}

export { prepareData };
