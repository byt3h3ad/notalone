import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="max-w-3xl mx-8 place-content-center grid my-6">
      <p>all our mental health is fucked.</p>
      <p>we all sometimes need a place to vent, without judgement.</p>
      <p>this is meant to be one.</p>
      <p>completely anonymous.</p>
      <p>be kind,</p>
      <p>to others, to yourself.</p>
      <p>you are not alone.</p>
    </main>
  );
}
