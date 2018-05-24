/**
 * Build the webpack configuration
 * To use webpack's env variable from cli ex. --env.production, we must change the config from
 * and object to a function.
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */

const buildConfig = (env) => {
  console.log('Webpack env:', env);
  return require('./cfg/' +  Object.keys(env)[0] + '.js');
};

module.exports = buildConfig;
