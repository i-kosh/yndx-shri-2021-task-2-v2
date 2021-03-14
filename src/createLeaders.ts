import { Commit, Sprint, User, CommitId, UserId } from "./types";
import { Slide, LeadersData } from "./stories";

export default function createLeaders(
  currentSprint?: Sprint,
  commits?: Map<CommitId, Commit>,
  users?: Map<UserId, User>
): Slide<LeadersData> {
  const sprintName = currentSprint?.name || "";

  const leaders: Slide<LeadersData> = {
    alias: "leaders",
    data: {
      title: "Больше всего коммитов",
      subtitle: `${sprintName}`,
      emoji: "👑",
      users: [],
    },
  };

  const usersMap: Map<User, Set<Commit>> = new Map();

  if (currentSprint && commits && users) {
    commits.forEach((commit) => {
      if (
        commit.timestamp >= currentSprint.startAt &&
        commit.timestamp <= currentSprint.finishAt
      ) {
        const author =
          typeof commit.author !== "number"
            ? commit.author
            : users.get(commit.author);
        if (!author) {
          console.warn("автор не найден");
          return;
        }

        const usersMapEntry = usersMap.get(author);

        if (!usersMapEntry) {
          const set: Set<Commit> = new Set();
          usersMap.set(author, set.add(commit));
        } else {
          usersMapEntry.add(commit);
        }
      }
    });
  }

  for (const val of usersMap) {
    const user = val[0];
    const commitsSet = val[1];

    leaders.data.users.push({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      valueText: `${commitsSet.size}`,
    });
  }

  leaders.data.users.sort((a, b) => {
    const verdict1 = parseInt(b.valueText) - parseInt(a.valueText);

    if (verdict1 === 0) {
      return a.id - b.id;
    }

    return verdict1;
  });

  return leaders;
}

export { createLeaders };
