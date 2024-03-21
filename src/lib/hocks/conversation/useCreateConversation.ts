import { chatContext } from "@/components/context/ChatContextProvider";
import { isArabicChar } from "@/lib/utlis";
import { createNewMessageFrontV } from "@/lib/validation/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useParams } from "next/navigation";

type Props = {
  handleSendMessage?: (key?: any) => void;
  isAiThink?: boolean;
  isAiThinkCompleted?: boolean;
};
type Inputs = z.infer<typeof createNewMessageFrontV>;

const useCreateConversation = ({
  handleSendMessage,
  isAiThink,
  isAiThinkCompleted,
}: Props) => {
  const [textArabicDirection, setTextArabicDirection] = useState(false);
  const params = useParams();
  const {
    selectedModel,
    setFile,
    onOpenUploadFile,
    selectTechnology,
    file,
    sessionUser,
  } = useContext(chatContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    resolver: zodResolver(createNewMessageFrontV),
    defaultValues: {
      conversationId: params.id as string,
    },
  });
  useEffect(() => {
    if (errors.conversationId?.message || errors.content?.message) {
      toast.error("your message not send");
    }
  }, [errors, isDirty]);
  useEffect(() => {
    if (watch("content")?.length == 1) {
      const isArabic = isArabicChar(watch("content"));
      setTextArabicDirection(isArabic);
    } else if (watch("content")?.length == 0) {
      setTextArabicDirection(false);
    }
  }, [watch]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const message = {
      ...data,
      media: file,
      technologyId: selectTechnology?.id,
      model: selectedModel,
    };

    handleSendMessage && handleSendMessage(JSON.stringify(message));
    setFile(null);
    reset();
  };

  return {
    onSubmit,
    file,
    setFile,
    sessionUser,
    handleSubmit,
    register,
    watch,
    reset,
    textArabicDirection,
    onOpenUploadFile,
  };
};

export default useCreateConversation;
