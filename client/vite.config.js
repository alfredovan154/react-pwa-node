"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const vite_plugin_pwa_1 = require("vite-plugin-pwa");
const plugin_alias_1 = __importDefault(require("@rollup/plugin-alias"));
const path_1 = require("path");
const projectRootDir = (0, path_1.resolve)(__dirname);
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        (0, plugin_react_1.default)(),
        (0, vite_plugin_pwa_1.VitePWA)({
            registerType: "autoUpdate",
            injectRegister: "auto",
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
            },
            manifest: {
                name: 'PWA',
                short_name: 'PWA',
                description: 'PWA with react',
                theme_color: '#ffffff'
            }
        }),
        (0, plugin_alias_1.default)({
            entries: [
                {
                    find: "@",
                    replacement: (0, path_1.resolve)(projectRootDir, "src"),
                },
            ],
        }),
    ],
});
