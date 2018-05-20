import isValidMove from './isValidMove';
import getNextMove from './getNextMove';

const api = moves => (
  isValidMove(moves)
   ? Promise.resolve(getNextMove(moves))
   : Promise.reject()
);

export default api;