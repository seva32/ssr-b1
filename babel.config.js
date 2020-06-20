module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>1%', 'ie 11', 'not op_mini all']
        }
      }
    ],
    '@babel/preset-react'
  ];

  const plugins = [
    'react-loadable/babel',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-object-rest-spread',
    'tailwind-components',
    'babel-plugin-styled-components',
    '@babel/plugin-transform-react-jsx',
    'babel-plugin-macros',
    '@babel/plugin-transform-react-jsx-source',
    '@babel/plugin-proposal-function-bind'
  ];

  return {
    presets,
    plugins
  };
};
