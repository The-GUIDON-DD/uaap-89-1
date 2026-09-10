import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sports/:sport", "routes/sport.tsx"),
] satisfies RouteConfig;
