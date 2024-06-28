import type { Category, Product, Supplier } from "@interfaces/models/.";
import { Component } from "@interfaces/react";
import { createContext, useContext } from "react";

import DB from "./pouchDB";

const document = {
  categoryDocument: DB.getInstance<Category>(),
  productDocument: DB.getInstance<Product>(),
  supplierDocument: DB.getInstance<Supplier>(),
};

const DatabaseContext = createContext(document);

export const DatabaseProvider: Component = ({ children }) => {
  return (
    <DatabaseContext.Provider value={document}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDocuments = () => useContext(DatabaseContext);
