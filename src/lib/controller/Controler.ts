class Controller {
  paginationData({
    messages,
    cursor,
    limit,
  }: {
    messages: any[];
    cursor?: number;
    limit: number;
  }) {
    let nextCursor: typeof cursor | undefined = undefined;
    const sortedData = messages.sort(function (p1, p2) {
      if (p1.id < p2.id) return -1;
      if (p1.id > p2.id) return 1;
      return 0;
    });
    if (sortedData.length > limit) {
      const nextItem = sortedData[0]; // return the last item from the array
      nextCursor = nextItem?.id;
    }

    return {
      ietms: sortedData,
      nextCursor,
    };
  }
}
