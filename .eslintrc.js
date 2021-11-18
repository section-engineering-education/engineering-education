module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true
  },
  plugins: ["html"],
  extends: "standard",
  globals: {
    window: true,
    axios: true,
    Vue: true,
    _: true,
    moment: true,
    collect: true,
    jQuery: true,
    $: true,
    App: true
  },
  rules: {
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    quotes: [1, "double"],
    semi: [2, "always"],
    "no-tabs": 0,
    "no-unused-vars": 1,
    "handle-callback-err": 1,
    eqeqeq: 1,
    indent: 0,
    "no-mixed-spaces-and-tabs": 0,
    "space-before-function-paren": ["error", "never"]
  }
};
