import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginImport from "eslint-plugin-import"; // Для налаштування порядку імпортів
import simpleImportSort from "eslint-plugin-simple-import-sort"; // Для автоматичного сортування

export default [
  {
    files: ["src/**/*.{ts,tsx}"], // Перевіряє лише файли в директорії 'src'
    ignores: [
      "dist/",
      "build/",
      "bundle.js",
      ".config/",
      "node_modules/*",
      "webpack.config.js",
    ], // Ігнорує 'dist', 'build', та інше
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      import: pluginImport,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Вимкнути правило для JSX, яке вимагає імпорту React
      "react/react-in-jsx-scope": "off",
      "no-constant-condition": "off",
      " @typescript-eslint/no-unused-expressions": "off",
      "node/no-unsupported-features/node-builtins": "off",

      // Правила для сортування імпортів
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"], // Node.js модулі та сторонні залежності
            ["internal"], // Внутрішні alias шляхи
            ["parent", "sibling", "index"], // Відносні шляхи
          ],
          "newlines-between": "always", // Порожній рядок між групами
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "simple-import-sort/imports": "error", // Автоматичне сортування
      "simple-import-sort/exports": "error", // Автоматичне сортування експорту
    },
  },
];
