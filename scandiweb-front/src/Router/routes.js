import Cart from '../pages/Cart/Cart';
import Category from '../pages/Category/Category';
import Description from '../pages/Description/Description';
import {
  ALL,
  CLOTHES,
  DEFAULT,
  TECH,
  DESCRIPTION,
  DESCRIPTION_ALL_PRODUCTS,
  CART,
} from './consts';

export const routes = [
  { path: DEFAULT, element: <Category /> },
  { path: ALL, element: <Category /> },
  { path: CLOTHES, element: <Category /> },
  { path: TECH, element: <Category /> },
  { path: DESCRIPTION, element: <Description /> },
  { path: DESCRIPTION_ALL_PRODUCTS, element: <Description /> },
  { path: CART, element: <Cart /> },
];
