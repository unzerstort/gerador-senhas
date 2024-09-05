import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  
  pluginJs.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
    rules: {

      "no-unused-vars": "warn",

      'max-len': ["error", { "code": 88 }]
    }
}
];