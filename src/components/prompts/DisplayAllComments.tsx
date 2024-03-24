import { useComment } from "@/lib/hocks/prompts/useComment";
import { Card, CardHeader, CardBody, User, Button } from "@nextui-org/react";
import { ListFilter } from "lucide-react";
import IconButton from "../global/IconButton";
import moment from "moment";

type Props = {
  promptId: number;
};

const DisplayAllComments = (props: Props) => {
  const { promptId } = props;
  const {
    comments,
    isLoading,
    isSuccess,
    handleNextPage,
    hasNextPage,
    isLoadingMore,
  } = useComment({
    promptId,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {isSuccess &&
          Array.isArray(comments) &&
          comments?.map((comment: any, index: number) => {
            return (
              <Card
                key={index}
                className="shadow-none bg-slate-50 rounded-sm  "
                shadow="none"
              >
                <CardHeader className="pb-0 flex items-center justify-between w-full">
                  <User
                    name={comment?.user.name}
                    avatarProps={{
                      src: comment?.user.image ?? "/images/default.jpeg",
                    }}
                  />

                  <div className="flex items-center">
                    <span>{moment(comment?.updatedAt).fromNow()}</span>
                    <IconButton Icon={ListFilter} />
                  </div>
                </CardHeader>
                <CardBody>
                  <p className=" leading-relaxed">
                    {" "}
                    {comment.id} {comment.content}
                  </p>
                </CardBody>
              </Card>
            );
          })}
      </div>
      <div className="flex items-center w-full">
        <Button
          color="primary"
          variant="bordered"
          isDisabled={!hasNextPage}
          isLoading={isLoadingMore}
          onClick={() => handleNextPage()}
        >
          load mor
        </Button>
      </div>
    </div>
  );
};

export default DisplayAllComments;
