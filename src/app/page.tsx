"use client";
import { Button } from "@nextui-org/react";

const sendMessage = async () => {
  const res = await fetch("/api/messages", {
    method: "POST",
    body: JSON.stringify({
      content: "who are you ",
      userId: 1,
      technologyId: 1,
      conversationId: "4533bbb9-ebae-4ba3-aef7-a138a477a74a",
    }),
  });

  if (res.ok) {
    const body = await res.body;
    console.log(body);
  } else {
    console.log("errros");
  }
};

export default function Home() {
  return (
    <div className="w-full h-screen bg-sky-600 flex items-center justify-center">
      <Button color="danger" onClick={sendMessage}>
        send your mess
      </Button>
    </div>
  );
}
