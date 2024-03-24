import prismaConfig from "../configs/prismaConfig";
import Controller from "./controller";
import { allCommentPromptSchemaInfinityPrompts } from "@/lib/validation/comments_validation";
class CommentController extends Controller {
  async showAll(props: allCommentPromptSchemaInfinityPrompts) {
    const { promptId, limit, cursor, skip, userId } = props;

    const items = await prismaConfig.comment.findMany({
      take: limit + 1,

      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: "desc",
      },
      where: {
        promptId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return this.paginationData({ items, cursor, limit });
  }
}

const commentController = new CommentController();

export default commentController;
