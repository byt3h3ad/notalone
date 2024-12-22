import { createLazyFileRoute } from "@tanstack/react-router";
import { JSX } from "react/jsx-runtime";
import { Thought } from "../components/Thought";
import { useGetThoughts } from "../lib/hooks";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError } = useGetThoughts();
  return (
    <section className="my-4">
      {isPending && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {data?.data.map(
        (
          thought: JSX.IntrinsicAttributes & {
            content: string;
            emotions: string[];
            _id: string;
            created_at: string;
            likes: number;
          }
        ) => <Thought {...thought} />
      )}
    </section>
  );
}
