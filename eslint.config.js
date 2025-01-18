import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint, { parser } from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginCypress from "eslint-plugin-cypress";

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: parser,
      },
    },
    plugins: {
      js: pluginJs,
      vue: pluginVue,
      ts: tseslint,
      cypress: pluginCypress,
    },
    env:{
      'cypress/globals': true,
      'vue/setup-compiler-macros': true,
    },
    extends:[
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:cypress/recommended",
    ],
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginVue.configs["flat/essential"].rules,
      ...pluginCypress.configs.recommended.rules,
    },
  },
];