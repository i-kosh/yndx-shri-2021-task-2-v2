import { Comment, Sprint, User, CommentId, UserId } from "./types";
import { Slide, VoteData } from "./stories";
import getPlural from "./utils/getPlural";

const isCommentInSprint = (comment: Comment, sprint: Sprint) => {
  return (
    comment.createdAt >= sprint.startAt && comment.createdAt <= sprint.finishAt
  );
};

export default function createVote(
  currentSprint?: Sprint,
  comments?: Map<CommentId, Comment>,
  users?: Map<UserId, User>
): Slide<VoteData> {
  const sprintName = currentSprint?.name || "";

  const slide: Slide<VoteData> = {
    alias: "vote",
    data: {
      title: "Самый 🔎 внимательный разработчик",
      emoji: "🔎",
      subtitle: sprintName,
      users: [],
    },
  };

  const usersMap: Map<User, number> = new Map();

  if (currentSprint && comments && users) {
    comments.forEach((comment) => {
      if (isCommentInSprint(comment, currentSprint)) {
        const author =
          typeof comment.author !== "number"
            ? comment.author
            : users.get(comment.author);
        if (!author) {
          console.warn("автор не найден");
          return;
        }

        const currentLikesCount = usersMap.get(author);
        usersMap.set(author, (currentLikesCount || 0) + comment.likes.length);
      }
    });
  }

  for (const val of usersMap) {
    const user = val[0];
    const likesCount = val[1];

    slide.data.users.push({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      valueText: `${likesCount} ${getPlural(likesCount, [
        "голос",
        "голоса",
        "голосов",
      ])}`,
    });
  }

  slide.data.users.sort(
    (a, b) => parseInt(b.valueText) - parseInt(a.valueText)
  );

  return slide;
}

export { createVote };
