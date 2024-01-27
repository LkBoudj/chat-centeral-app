import { z } from "zod";
import Form from "../global/Form";
import { Textarea } from "@nextui-org/react";
import { Mic, SendHorizontal, Paperclip } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContainerMaxWind, IconButton } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewMessageV } from "@/lib/validation";
import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { trpc } from "@/trpc/client";
import { useParams, useRouter } from "next/navigation";
import { CONVARSATION_NOT_FOUND } from "@/lib/configs/custom_errors_code";
import { conversations_page } from "@/lib/configs/routes_name";
import { chatContext } from "../context/ChatContextProvider";

type Props = {};

type Inputs = z.infer<typeof createNewMessageV>;

const CreateMessage = (props: Props) => {
  const params = useParams();
  const { addNewData, isUpdatedSuccess, isUpdatePending } =
    useContext(chatContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    resolver: zodResolver(createNewMessageV),
    defaultValues: { conversationId: params.id as string },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //console.log(data);
    //const messages = ;
    addNewData(data);
    //  reset();
  };
  useEffect(() => {
    if (errors.conversationId?.message || errors.content?.message) {
      toast.error("your message not sened");
    }
  }, [errors, isDirty]);
  return (
    <div className="absolute bottom-[12px] w-full left-0 px-4 lg:pr-[370px]">
      <ContainerMaxWind className=" max-w-7xl mx-auto ">
        <Form
          handleSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl ring-1 p-5 "
        >
          <div className="flex items-start">
            <Textarea
              {...register("content")}
              minRows={1}
              placeholder="Ask me any think"
              variant="bordered"
              color="default"
              classNames={{
                inputWrapper: "border-none shadow-none ",
              }}
              className=" placeholder:text-slate-800 placeholder:font-semibold bg-transparent w-full "
            />

            <IconButton size={22} Icon={Mic} />
          </div>
          <div className="flex items-end justify-between">
            <IconButton size={22} Icon={Paperclip} />
            <IconButton
              isLoading={isUpdatePending}
              isDisabled={
                watch("content")?.length <= 0 ||
                (isUpdatePending && !isUpdatedSuccess)
              }
              type="submit"
              size={22}
              Icon={SendHorizontal}
            />
          </div>
        </Form>
      </ContainerMaxWind>
    </div>
  );
};

export default CreateMessage;
