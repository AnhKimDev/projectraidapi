export interface Group {
  groupID: string;
  name: string;
  userIDs: string[];
}

export interface GroupInterface {
  getGroupByGroupID(groupID: string): Promise<Group>;
  getGroupsByUserID(userID: string): Promise<Group[]>;
  createGroup(groupName: string): Promise<void>;
  updateGroup(groupID: number, groupName: string): Promise<void>;
  deleteGroup(groupID: number): Promise<void>;
}
