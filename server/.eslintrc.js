module.exports = {
  "extends": "airbnb",
  "plugins": [
    "import",
  ],
  "rules": {
    "camelcase": 0,
    "strict": 0,
    "semi": 0,
    "no-console": "off",
    "max-len": [2, 140, 4],
  },
 "globals": {
    "window": true,
    "WebSocket": true,
    "URL": true,
    "btoa": true,
    "fetch": true,
    "document": true,
  },
};