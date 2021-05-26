// eslint-disable-next-line import/no-extraneous-dependencies
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
/**
 * Creates a mockstore that can be used while testing
 */
const middlewares = [thunk];
const createNewMockStore = configureMockStore(middlewares);
const createMockStore = (initialState?: Record<string, unknown>) =>
  createNewMockStore(initialState);

export default createMockStore;
