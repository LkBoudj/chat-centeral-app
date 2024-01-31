import { privateProcuder, router } from "../trpc";

import TechnologyController from "@/lib/controller/technology_controller";

const technologyAppRouter = router({
  showAll: privateProcuder.query(async () => {
    return await TechnologyController.showAll();
  }),
  create: privateProcuder.query(async () => {
    return await TechnologyController.showAll();
  }),
});

export default technologyAppRouter;
