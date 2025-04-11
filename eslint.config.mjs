import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("next", "prettier"),

    rules: {
        "array-bracket-spacing": "warn",
        "comma-spacing": "warn",
        eqeqeq: "warn",
        "func-call-spacing": "warn",
        "key-spacing": "warn",
        "no-unused-vars": "warn",
        "object-curly-spacing": "warn",
        "react-hooks/exhaustive-deps": "off",
        "react/no-unescaped-entities": "off",
        semi: "warn",
    },
}]);