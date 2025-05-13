
import { ElementType } from './types';

let elementCounter = 0;

export const generateId = () => {
  return `element-${Date.now()}-${elementCounter++}`;
};
