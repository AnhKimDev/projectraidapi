export interface UserInterface {
  userID: string;
  name: string;
  image: string;
  email?: string;

  getUser(userID: number): Promise<UserInterface | null>;
  getUsersByGroupIDs(groupIDs: string[]): Promise<UserInterface[] | null>;
  createUser(userAttributes: UserInterface): Promise<void>;
  updateUser(userID: number, userAttributes: UserInterface): Promise<void>;
  deleteUser(userID: number): Promise<void>;
}
