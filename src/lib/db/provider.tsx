import type { Category, Product, Supplier } from "@interfaces/models/.";
import { Component } from "@interfaces/react";
import { createContext, useContext } from "react";

import DB from "./pouchDB";

const DATABASE_NAME = "primary-db";

const document = {
  categoryDocument: DB.getInstance<Category>(DATABASE_NAME),
  productDocument: DB.getInstance<Product>(DATABASE_NAME),
  supplierDocument: DB.getInstance<Supplier>(DATABASE_NAME),
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
