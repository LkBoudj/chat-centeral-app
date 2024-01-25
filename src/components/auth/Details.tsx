import ContainerMaxWind from "../global/ContainerMaxWind";

type Props = {};

const Details = (props: Props) => {
  return (
    <div className="hidden lg:flex justify-center items-center w-full h-full bg-gradient-to-t from-blue-900 to-indigo-500   text-white px-4">
      <ContainerMaxWind className="max-w-xl space-y-4">
        <h1 className="font-black text-7xl leading-snug">Hello ChatCentral!</h1>
        <p className="text-2xl font-medium">
          Are you looking for a smart way to communicate and share with others?
        </p>
        <p className="text-slate-300">
          With Chat Cateral, you can have a conversation with artificial
          intelligence in a natural way, and upload all types of files easily
          and quickly.
        </p>
      </ContainerMaxWind>
    </div>
  );
};

export default Details;
