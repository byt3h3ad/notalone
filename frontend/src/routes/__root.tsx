import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Thought } from "../components/Thought";

export const Route = createRootRoute({
  component: RootComponent,
});

const DummyObjects = [
  {
    content: "hello world!",
    emotions: ["Loss"],
    _id: "6766f360bb927648a065d0e1",
    created_at: "2024-12-21T16:57:04.169000",
    likes: 3,
  },
];

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      {DummyObjects.map((thought) => (
        <Thought {...thought} />
      ))}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
