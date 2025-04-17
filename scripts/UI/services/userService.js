import { HttpHandlers } from "./httpHandlers.js";
import { User } from "../modal/user.js";
import { API_URL } from "../constants/constant.js";

/**
 * Hanlees API calls for User data.
 * @class
 */
export class UserService {
  constructor() {
    /** @type {User[]} */
    this.users = [];
    // this.http = new HttpHandlers({
    //   ttl: 1 * 60 * 1000, 
    // });
    this.http = new HttpHandlers();
  }

  /**
   * 
   * @returns {Promise<User[]>} - Returns a promise that resolves to an array of User instances.
   * @throws Will throw an error if the fetch fails.
   */
  async loadUsers() {
    try {
      const userData = await this.http.fetch(API_URL.USERS);
      // Convert raw data to Users instances
      this.users = userData.map((user) => new User(user));

      return this.users;
    } catch (error) {
      console.error("Error loading users:", error);
      throw error;
    }
  }
}
