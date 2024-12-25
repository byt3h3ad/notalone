import { createLazyFileRoute } from "@tanstack/react-router";
import { JSX } from "react/jsx-runtime";
import { Thought } from "../components/Thought";
import { useGetThoughts } from "../lib/hooks";
import { Skeleton } from "../components/ui/skeleton";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError } = useGetThoughts();
  return (
    <>
      {isPending && (
        <section className="flex m-4 gap-4 flex-wrap justify-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className="h-48 aspect-[6/4] rounded-2xl" key={i} />
          ))}
        </section>
      )}
      <section className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {isError && <div>Error...</div>}
        {data?.data.map(
          (
            thought: JSX.IntrinsicAttributes & {
              content: string;
              emotions: string[];
              _id: string;
              created_at: string;
              likes: number;
            },
            index: number
          ) => <Thought {...thought} key={index} />
        )}
      </section>
    </>
  );
}
