import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    route('api/create-career', 'routes/api/create-career.ts'),
    route('login', 'routes/root/login.tsx'),
    route('/careers/:careerId', 'routes/root/career-detail.tsx'),
    layout("routes/layout/layout.tsx", [
        route('/dashboard', 'routes/root/dashboard.tsx'),
        route('/careerai', 'routes/root/careerai.tsx'),
        route('/admin/feedback', 'routes/admin/feedback.tsx'),
        route('/admin/all-users', 'routes/admin/all-users.tsx'),
        route('/career/create', 'routes/admin/create-career.tsx'),
    ]),
    index("routes/root/home.tsx")
] satisfies RouteConfig;
