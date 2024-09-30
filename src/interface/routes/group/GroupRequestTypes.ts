export interface getGroupByGroupID {
  groupID: string;
}
export interface getGroupsByUserID {
  userID: string;
}
export interface createGroup {
  groupName: string;
}
export interface updateGroupName {
  groupID: number;
  groupName?: string;
}
export interface addUserToGroup {
  groupID: number;
  userIDs?: number[];
}

export interface deleteGroup {
  groupID: number;
}
