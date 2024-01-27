import { Card } from "@nextui-org/react";
import { Bot } from "lucide-react";

const InitailtMessage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card
        shadow="none"
        className="bg-slate-50 shadow-sm p-8 mt-16 flex flex-col items-center space-y-3"
      >
        <Bot className=" " size={100} />
        <h1 className="font-bold text-xl">Welcome to Chat Central!</h1>

        <p className="text-center leading-loose font-medium text-md max-w-2xl">
          Your first message will set the topic of our conversation.
          <br />
          Tell me what you're interested in, or let me know if you'd like to
          chat about anything in particular.
          <br />
          We're excited to talk to you!
          <br />
          The Chat Central team
        </p>
      </Card>
    </div>
  );
};

export default InitailtMessage;
