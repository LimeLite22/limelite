import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["src/**/*.{ts,tsx}"], // Перевіряє лише файли в директорії 'src'
    ignores: [
      "dist/",
      "build/",
      "bundle.js",
      ".config/",
      ".config/",
      "node_modules/*",
      "webpack.config.js",
    ], // Ignore 'dist', 'build', and 'bundle.js'
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // Вимкнути правило для JSX, яке вимагає імпорту React
      "react/react-in-jsx-scope": "off",
      "no-constant-condition": "off",
      " @typescript-eslint/no-unused-expressions": "off",
      "node/no-unsupported-features/node-builtins": "off",
    },
  },
];
