import type { BaseModel } from "./base";

export type Category = BaseModel & {
  name: string;
};

export type Product = BaseModel & {
  name: string;
  price: number;

  category: Category;
};

export type Supplier = BaseModel & {
  name: string;

  products: Product[];
};
