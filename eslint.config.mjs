import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  
  pluginJs.configs.all,
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "func-style": "off",
      "max-params": "off",
      "max-statements": "off",
      "no-plusplus": "off",
      "no-unused-vars": "warn",
      "sort-keys": "off",
      "sort-vars": "off",
      "one-var": "off",
      'max-len': ["error", { "code": 88 }]
    }
}
];