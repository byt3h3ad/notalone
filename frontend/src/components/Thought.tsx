import { HandHeart } from "lucide-react";
import React from "react";
import { useLikeThought } from "../lib/hooks";
import { formatDate } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";

type Props = {
  content: string;
  emotions: string[];
  _id: string;
  created_at: string;
  likes: number;
};

export const Thought: React.FC<Props> = ({
  _id,
  content,
  created_at,
  likes,
}) => {
  const { mutate: like } = useLikeThought();
  return (
    <Card key={_id} className="w-fit h-fit">
      <CardHeader>
        <CardDescription className="opacity-60">
          {formatDate(created_at)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="">{content}</p>
      </CardContent>
      <CardFooter className="flex gap-2 text-sm text-pink-500">
        <Button
          variant="ghost"
          size={"icon"}
          onClick={() => {
            like(_id);
          }}
        >
          <HandHeart />
        </Button>
        {likes}
      </CardFooter>
    </Card>
  );
};
