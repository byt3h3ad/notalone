import { createLazyFileRoute } from "@tanstack/react-router";
import { Thought } from "../components/thought";
import { Skeleton } from "../components/ui/skeleton";
import { useGetThoughts } from "../lib/hooks";

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
      {isError && <div>Error...</div>}
      <section className="m-4 space-y-4 columns-3xs">
        {data?.data.map(
          (
            thought: {
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
