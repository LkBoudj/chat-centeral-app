import { globalContext } from "@/components/context/GlobalContextProvider";
import { promptContext } from "@/components/context/PromptContextProvider";
import {
  createCommentSchemaInput,
  createCommentSchema,
} from "@/lib/validation/comments_validation";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type CreateCommentProps = {
  promptId: number;
};
export const useComment = ({ promptId }: CreateCommentProps) => {
  const { prompt, setPrompt, comments, setComments } =
    useContext(promptContext);
  const { sessionUser } = useContext(globalContext);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { data, isLoading, isSuccess, fetchNextPage, hasNextPage } =
    trpc.promptsAppRouter.allCommentsByPrompts.useInfiniteQuery(
      {
        limit: 10,
        promptId: prompt.id,
      },
      {
        getNextPageParam: (lastPage) => {
          // console.log(lastPage.nextCursor);

          return lastPage.nextCursor;
        },
        // initialCursor: 1, // <-- optional you can pass an initialCursor
      }
    );
  const [page, setPage] = useState(0);
  const { mutate, isSuccess: createCommentIsSuccess } =
    trpc.promptsAppRouter.CreateComment.useMutation({
      onMutate(c: any) {
        c.createdAt = new Date();
        c.user = sessionUser;
        const newComments = [c, ...comments];

        setComments(newComments);
      },
    });

  const createComment = useCallback(
    (data: { promptId: number; content: string }) => {
      mutate({
        ...data,
      });
    },
    [setPrompt, prompt]
  );

  const handleNextPage = async () => {
    setIsLoadingMore(true);

    setTimeout(() => {
      if (hasNextPage) {
        fetchNextPage();
        setPage((page) => page + 1);
      }
      setIsLoadingMore(false);
    }, 1000);
  };

  useEffect(() => {
    if (isSuccess && data.pages && Array.isArray(data.pages)) {
      setComments([...comments, ...data.pages[page].items]);
    }
  }, [isSuccess, setComments, data]);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<createCommentSchemaInput>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      promptId,
    },
  });

  const onSubmit: SubmitHandler<createCommentSchemaInput> = async (data) => {
    await createComment(data);
  };

  const handleOnSubmitComment = handleSubmit(onSubmit);

  return {
    handleOnSubmitComment,
    onSubmit,
    control,
    errors,
    handleSubmit,
    isSuccess,
    isLoading,
    comments,
    handleNextPage,
    page,

    isLoadingMore,
    hasNextPage,
  };
};
