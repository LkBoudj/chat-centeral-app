import { MessageCircleMore, FileText, BrainCircuit } from "lucide-react";

const size = 42.16;
export const authNavigation: NavItem[] = [
  {
    name: "chat",
    path: "/chat",
    color: "text-blue-600",
    Icon: MessageCircleMore,
    backgroundPositionX: size,
    backgroundPositionY: -0.5,
  },
  {
    name: "prompts",
    path: "/prompts",
    color: "text-blue-600 ",
    Icon: BrainCircuit,
    backgroundPositionX: 82.3,
    backgroundPositionY: -0.5,
  },
  {
    name: "PDF reader",
    path: "/pdf",
    color: "text-blue-600",
    Icon: FileText,
    backgroundPositionX: size * 3,
    backgroundPositionY: -0.5,
  },
];
