import { UserAttributes } from "../models/UserAttributes";

export interface UserController {
  getUser: (userID: number) => Promise<UserAttributes>;
  getUsersByGroupIDs: (groupIDs: string[]) => Promise<UserAttributes[]>;
  createUser: (userName: string) => Promise<void>;
  updateUser: (userID: number, userName: string) => Promise<void>;
  deleteUser: (userID: number) => Promise<void>;
}
