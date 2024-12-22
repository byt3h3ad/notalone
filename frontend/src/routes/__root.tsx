import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useGetThoughtCount } from "../lib/hooks";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { data } = useGetThoughtCount();
  return (
    <main className="max-w-5xl mx-auto">
      <div className="py-2 mx-auto px-4 flex gap-4 justify-between lowercase">
        <div className="flex gap-4">
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
        <p>
          <span className="font-bold">{data?.data.total_posts}</span>{" "}
          #youarenotalone
        </p>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  );
}
