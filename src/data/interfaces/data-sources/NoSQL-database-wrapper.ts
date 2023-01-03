import User from "@domain/entities/user";
export interface NoSQLDatabaseWrapper {
  find(query: object): Promise<any[]>;
  findOne(query: object): Promise<any>;
  insertOne(doc: any): void;
  deleteOne(id: String): void;
  updateOne(id: String, data: object): void;
}
