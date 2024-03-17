import { MessageCircleMore, FileText, BrainCircuit } from "lucide-react";
import {
  conversations_page,
  dash_techs_page,
  dash_users_page,
  prompts_page,
  subscription_page,
} from "../configs/routes_name";

const size = 42.16;
export const authNavigation: NavItem[] = [
  {
    name: "chat",
    path: conversations_page,
    color: "text-blue-600",
    Icon: MessageCircleMore,
    backgroundPositionX: size,
    backgroundPositionY: -0.5,
  },
  {
    name: "Prompt Library",
    path: prompts_page,
    color: "text-blue-600 ",
    Icon: BrainCircuit,
    backgroundPositionX: 82.3,
    backgroundPositionY: -0.5,
  },
  {
    name: "Subscription",
    path: subscription_page,
    color: "text-blue-600",
    Icon: FileText,
    backgroundPositionX: size * 3,
    backgroundPositionY: -0.5,
  },
];

export const dashNavigation: NavItem[] = [
  {
    name: "users",
    path: dash_users_page,
    Icon: MessageCircleMore,
  },
  {
    name: "technologies",
    path: dash_techs_page,
    Icon: MessageCircleMore,
  },
];
