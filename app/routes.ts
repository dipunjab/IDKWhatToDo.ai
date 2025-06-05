import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout/layout.tsx", [
        route('/dashboard', 'routes/root/dashboard.tsx'),
        route('/careerai', 'routes/root/careerai.tsx'),
        route('/admin/feedback', 'routes/admin/feedback.tsx'),
        route('/admin/all-users', 'routes/admin/all-users.tsx'),
    ]),
    index("routes/root/home.tsx")
] satisfies RouteConfig;
