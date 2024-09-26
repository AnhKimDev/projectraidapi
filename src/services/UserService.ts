/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserInterface } from "./../interface/UserInterface";

export class UserService implements UserInterface {
  userID: string;
  name: string;
  image: string;
  email?: string;

  constructor(userAttributes: UserInterface) {
    this.userID = userAttributes.userID;
    this.name = userAttributes.name;
    this.image = userAttributes.image;
    this.email = userAttributes.email;
  }

  async getUser(userID: number): Promise<UserInterface | null> {
    try {
      const user = await this.simulateDatabaseCall();
      return user as UserInterface;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUsersByGroupIDs(
    groupIDs: string[]
  ): Promise<UserInterface[] | null> {
    try {
      const users = await this.simulateDatabaseCall();
      return users as UserInterface[];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createUser(userAttributes: UserInterface): Promise<void> {
    try {
      await this.simulateDatabaseCall();
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(
    userID: number,
    userAttributes: UserInterface
  ): Promise<void> {
    try {
      await this.simulateDatabaseCall();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser(userID: number): Promise<void> {
    try {
      await this.simulateDatabaseCall();
    } catch (error) {
      console.error(error);
    }
  }

  private async simulateDatabaseCall(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Simulate a database call
      setTimeout(() => {
        resolve({
          /* some data */
        });
      }, 1000);
    });
  }
}
