import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <main>
      <div className="py-2 px-4 flex gap-4 lowercase">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/create" className="[&.active]:font-bold">
          Create
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  );
}
