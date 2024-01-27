import { getAuthSession } from "@/lib/configs/nextAuthOption";

export const createContext = async () => {
  const session = await getAuthSession();

  return {
    auth: session?.user,
  };
};
