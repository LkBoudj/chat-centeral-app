class Controller {
  paginationData({
    items,
    cursor,
    limit,
  }: {
    items: any[];
    cursor: any;
    limit: number;
  }) {
    let nextCursor: typeof cursor | undefined = undefined;
    if (items.length > limit) {
      const nextItem = items.pop();
      nextCursor = nextItem!.id;
    }

    return {
      items,
      nextCursor,
    };
  }
}

export default Controller;
