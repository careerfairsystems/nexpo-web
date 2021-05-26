/**
 * Provides functions that run functions in mock environments
 */

/**
 * Holds the environment that program was launched in
 */
const INITIAL_ENVIRONMENT = process.env.NODE_ENV;

/**
 * Sets the environment
 * @param {string} env
 */
const setEnvironment = (env: string) => {
  process.env.NODE_ENV = env;
};

/**
 * Runs a given function in a given environment
 * @param {string} env
 * @param {function} func
 */
const runInEnvironment = (env: string, func: Function) => {
  setEnvironment(env);
  func();
  setEnvironment(INITIAL_ENVIRONMENT);
};

/**
 * Build the mocks
 */
const mockEnvironment = {
  runInProduction: (func: Function): void =>
    runInEnvironment('production', func),
  runInDevelopment: (func: Function): void =>
    runInEnvironment('development', func),
  runInTest: (func: Function): void => runInEnvironment('test', func),
};

export default mockEnvironment;
