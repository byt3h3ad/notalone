import { HandHeart } from "lucide-react";
import React from "react";
import { useGetLikeCount, useLikeThought } from "../lib/hooks";
import { cn, formatDate } from "../lib/utils";
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
  className?: string;
};

export const Thought: React.FC<Props> = ({
  _id,
  content,
  created_at,
  className,
}) => {
  const { data, isPending: isLikesPending, refetch } = useGetLikeCount(_id);
  const { mutate, isPending } = useLikeThought();
  const likes = data?.data.likes;
  const handleClick = () => {
    mutate(_id, {
      onSuccess: () => {
        refetch();
      },
    });
  };
  return (
    <Card key={_id} className={cn("break-inside-avoid-column", className)}>
      <CardHeader>
        <CardDescription className="opacity-60">
          {formatDate(created_at)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-pretty whitespace-pre-line">{content}</p>
      </CardContent>
      <CardFooter className="text-pink-600">
        <button
          className="flex items-center gap-3 bg-slate-100 py-1 px-3 rounded-full"
          onClick={handleClick}
        >
          {isPending ? (
            <span className="opacity-60 font-light text-sm">supporting...</span>
          ) : (
            <>
              <HandHeart className="size-6" />
              <span className="text-sm">{isLikesPending ? 0 : likes}</span>
            </>
          )}
        </button>
      </CardFooter>
    </Card>
  );
};
