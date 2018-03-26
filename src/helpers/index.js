export const isUserMove = (isUserEven, isMoveEven) => (
  (isUserEven && isMoveEven) || (!isUserEven && !isMoveEven)
);

export const isEven = num => (
  num % 2 === 0
);
