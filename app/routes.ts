import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("one-team", "routes/one-team.tsx"),
  route("sports/:sport", "routes/sport.tsx"),
] satisfies RouteConfig;
