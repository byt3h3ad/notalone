import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { useGetThoughtCount } from "../lib/hooks";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : React.lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    );

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { data } = useGetThoughtCount();
  return (
    <main className="max-w-5xl mx-auto">
      <div className="py-2 mx-auto px-4 flex gap-4 w-full justify-between lowercase">
        <div className="flex gap-4">
          <Link to="/" className="[&.active]:font-bold">
            home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            about
          </Link>
          <Link to="/post" className="[&.active]:font-bold">
            post
          </Link>
        </div>
        <p>
          <span className="font-bold">{data?.data.total_posts}</span>{" "}
          #youarenotalone
        </p>
      </div>
      <hr />
      <Outlet />
      <footer className="py-2 px-4 text-center">
        made with ❤️ by{" "}
        <a
          href="https://home.byt3h3ad.workers.dev/website"
          className="underline-offset-4 hover:underline"
          target="_blank"
        >
          byt3h3ad
        </a>
      </footer>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </main>
  );
}
