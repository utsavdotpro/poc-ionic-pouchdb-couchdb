import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

import type { BaseModel } from "@interfaces/models";
import { getFirstDefinded } from "@utils/helpers";

PouchDB.plugin(PouchDBFind);

class DB<T extends BaseModel> {
  private static instance: DB<any>;
  private db: PouchDB.Database<T>;

  private constructor(dbName: string) {
    this.db = new PouchDB(dbName);
  }

  public static getInstance<T extends BaseModel>(dbName: string): DB<T> {
    if (!DB.instance) DB.instance = new DB<T>(dbName);

    return DB.instance;
  }

  async create(
    doc: Omit<T, "createdAt" | "updatedAt">
  ): Promise<PouchDB.Core.Response> {
    updateTimestamps(doc as T, true);
    return this.db.post(doc as T);
  }

  async read(
    id: string
  ): Promise<PouchDB.Core.Document<T> & PouchDB.Core.RevisionIdMeta> {
    return this.db.get(id);
  }

  async update(
    id: string,
    doc: Omit<T, "createdAt" | "updatedAt"> &
      Partial<PouchDB.Core.RevisionIdMeta>,
    revId?: string
  ): Promise<PouchDB.Core.Response> {
    updateTimestamps(doc as T, false);

    return this.db.put({
      _id: id,
      _rev: getFirstDefinded(revId, doc._rev),
      ...(doc as T),
    });
  }

  async delete(
    doc: PouchDB.Core.Document<Omit<T, "createdAt" | "updatedAt">> &
      PouchDB.Core.RevisionIdMeta
  ): Promise<PouchDB.Core.Response> {
    return this.db.remove(doc);
  }

  async find(
    selector: PouchDB.Find.Selector
  ): Promise<PouchDB.Find.FindResponse<T>> {
    return this.db.find({ selector });
  }
}

const updateTimestamps = (doc: BaseModel, createMode: boolean) => {
  if (createMode) {
    doc.createdAt = new Date();
  }

  doc.updatedAt = new Date();
};

export default DB;
