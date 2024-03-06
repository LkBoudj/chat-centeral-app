import { backRegisterSchema } from "@/lib/validation";
import { publicProducer, router } from "../trpc";
import prismaConfig from "@/lib/configs/prismaConfig";
import { hashPassword } from "@/lib/helper";
import moment from "moment";
import { createCustomer } from "@/lib/handel_stripe/stripe";
const authantication = router({
  signup: publicProducer.input(backRegisterSchema).mutation(async (opt) => {
    const {
      input: { email, password, fullName },
    } = opt;
    const hashPass = await hashPassword(password);
    const customer = await createCustomer({
      name: fullName,
      email,
    });
    let data: any = {
      name: fullName,
      email,
      password: hashPass,
      roles: "user",
      SubscriptionExpirydate: moment().add(30, "days").format(),
    };
    if (customer) data.stripeCustomerId = customer.id;

    const createNewUser = await prismaConfig.user.create({
      data,
      select: {
        email: true,
      },
    });

    return createNewUser;
  }),
});

export default authantication;
