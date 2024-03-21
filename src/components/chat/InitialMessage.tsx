import { ContainerMaxWind, Message } from "..";

const InitialMessage = () => {
  return (
    <ContainerMaxWind className="w-full max-w-7xl mx-auto  pt-4  lg:pr-[370px]">
      <Message
        fromMachin={true}
        content={"Your first message will set the name of our conversation."}
      />
    </ContainerMaxWind>
  );
};

export default InitialMessage;
