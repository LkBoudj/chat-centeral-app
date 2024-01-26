export const messsagesData = [...Array(100)].map((_, index) => {
  return {
    content:
      "Ensure that the component renders the same content server-side as it does during",
    formMachin: index % 2 == 0,
  };
});
