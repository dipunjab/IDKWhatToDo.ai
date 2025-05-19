import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout/layout.tsx", [
        route('/', 'routes/root/dashboard.tsx'),
    ]),
] satisfies RouteConfig;
