import { type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/display", "routes/display.tsx"),
    route("/upload", "routes/upload.tsx"),
    route("/list", "routes/list.tsx"),
] satisfies RouteConfig;
