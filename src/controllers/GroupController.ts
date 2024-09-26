import { GroupAttributes } from "../models/GroupAttributes";

export interface GroupController {
  getGroupByGroupID: (groupID: string) => Promise<GroupAttributes>;
  getGroupsByUserID: (userID: string) => Promise<GroupAttributes[]>;
  createGroup: (groupName: string) => Promise<void>;
  updateGroup: (groupID: number, groupName: string) => Promise<void>;
  deleteGroup: (groupID: number) => Promise<void>;
}
