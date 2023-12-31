module.exports = {
  root: true,
  env: { node: true },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "@vue/prettier",
    "./.eslintrc-auto-import.json"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    Mutable: "readonly",
    ToIndexable: "readonly",
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly"
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unused-vars": "error",
    "no-var": "error",
    "no-unused-vars": 0,
    "prefer-const": "error",
    "@typescript-eslint/no-empty-function": 0,
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-case-declarations": 0,
    "vue/no-v-html": 0,
    "no-empty": 0,
    "no-global-assign": 0,
    "no-constant-condition": 0,
    "no-debugger": 0,
    "no-irregular-whitespace": 0,
    "vue/multi-word-component-names": 0
  }
};
