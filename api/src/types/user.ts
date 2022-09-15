import { Role } from "../enums/Role";

export type User = {
  id: number;
  status: "published" | "draft" | "archived";
  userCreated: string;
  dateCreated: Date;
  userUpdated: string;
  dateUpdated: Date;
  role: Role;
  username: string;
  password: string;
};
