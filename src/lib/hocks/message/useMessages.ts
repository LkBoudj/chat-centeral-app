import { chatContext } from "@/components/context/ChatContextProvider";
import { globalContext } from "@/components/context/GlobalContextProvider";
import { conversations_page } from "@/lib/configs/routes_name";
import {
  createNewMessageFrontV,
  createNewMessageFrontVInputs,
} from "@/lib/validation/messages";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Media } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useMessages = () => {
  const { id } = useParams() ?? {};

  const [aiMessage, setAiMessage] = useState("");

  const { selectTechnology, sessionUser, allMessages, setAllMessages } =
    useContext(chatContext);

  if (id) {
  }
  const { data, isLoading, isSuccess, isPending } = trpc.messages.all.useQuery({
    id: id as string,
  });

  const handleSendMessage = (data: any) => {};

  useEffect(() => {
    if (data) {
      setAllMessages(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {}, [aiMessage]);

  return {
    isPending,
    isLoading,
    isSuccess,
    handleSendMessage,
    allMessages,
  };
};

export const useSubmitMessage = () => {
  const params = useParams();
  const router = useRouter();
  const [isAiThink, setIsAiThink] = useState<boolean>(false);
  const { selectedModel, selectTechnology, allMessages, setAllMessages } =
    useContext(chatContext);

  const createMessageFromJson = useCallback(
    async (res: Response, allMessages: any, setAllMessages: any) => {
      const { success, data, errors } = await res.json();

      if (success) {
        const newData = [...allMessages, data];
        setAllMessages(newData);
      } else {
        toast.error(errors);
      }
    },
    []
  );
  const createMessageFromStream = useCallback(
    async (res: Response, allMessages: any, setAllMessages: any) => {
      const stream = await res.body;

      const reader: any = stream?.getReader();
      const decoder = new TextDecoder();

      const aiId = "ai_message" + Date.now();
      const newAiMessage = {
        id: aiId,
        content: "",
        fromMachin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newDataWithAiMessage = [...allMessages, newAiMessage];
      setAllMessages(newDataWithAiMessage);

      let responseText = "";
      while (true) {
        const { value, done } = await reader?.read();
        const chunkValue = decoder.decode(value);
        responseText += chunkValue;
        const updatedMessages = newDataWithAiMessage.map((message: any) => {
          if (message.id == aiId) {
            message.content = responseText;
          }
          return message;
        });
        setAllMessages(updatedMessages);
        if (done) {
          break;
        }
      }
    },
    []
  );

  const handelFetchSendData = useCallback(
    async (data: any) => {
      setIsAiThink(true);
      const newDataWithUserMessage = [
        ...allMessages,
        {
          ...data,
          id: Date.now(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      setAllMessages(newDataWithUserMessage);
      try {
        const res = await fetch(`/api/messages/${params.id ?? ""}`, {
          method: "POST",
          body: JSON.stringify(data),
        });

        const contentType = res.headers.get("Content-Type");
        if (!res.ok) {
          toast.error("some errors");
        }
        if (contentType == "application/json") {
          await createMessageFromJson(
            res,
            newDataWithUserMessage,
            setAllMessages
          );
        } else {
          await createMessageFromStream(
            res,
            newDataWithUserMessage,
            setAllMessages
          );
        }

        if (!params.id) {
          const conversationId = res.headers.get("conversationId");
          console.log("i'll go to ", conversationId);
          router.push(`${conversations_page}/${conversationId}`, {
            scroll: true,
          });
        }
      } catch (e) {
        console.log(e);
      }

      setIsAiThink(false);
    },
    [setAllMessages, allMessages]
  );

  const { setFiles, onOpenUploadFile, files, sessionUser } =
    useContext(globalContext);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm<createNewMessageFrontVInputs>({
    resolver: zodResolver(createNewMessageFrontV),
    defaultValues: {
      conversationId: params.id as string,
    },
  });

  const handelSubmitMessage: SubmitHandler<createNewMessageFrontVInputs> = (
    message
  ) => {
    const data: any = message;
    if (files.length) {
      data.message = files.map((file: Media) => file.id);
    }

    data.technologyId = selectTechnology?.id;
    data.model = selectedModel ?? "";

    handelFetchSendData(data);
    reset();
  };

  const customHandleSubmit = handleSubmit(handelSubmitMessage);

  const handelRemoveSelectedFile = (id: number) => {
    const filesAfterRemoveMedia = files.filter((media: any) => media.id != id);
    setFiles(filesAfterRemoveMedia);
  };

  return {
    setFiles,
    onOpenUploadFile,
    files,
    sessionUser,
    handelRemoveSelectedFile,
    customHandleSubmit,
    register,
    watch,
    selectedModel,
    selectTechnology,
    isAiThink,
  };
};

export default useMessages;
