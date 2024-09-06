module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    ["@babel/preset-react", {
      "runtime": "automatic"
   }],
    '@babel/preset-typescript',
    ['module:metro-react-native-babel-preset', { 'useTransformReactJSXExperimental': true }]
  ],
  overrides: [{
    'plugins': [
      ['@babel/plugin-transform-private-methods', {
        'loose': true
      }]
    ]
  }]
};