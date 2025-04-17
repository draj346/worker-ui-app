// User.js
/**
 * Represents a user.
 * @class
 */
export class User {
  /**
   * @typedef {Object} UserData
   * @property {string} id
   * @property {string} name
   * @property {string} company
   * @property {string} username
   * @property {string} email
   * @property {string} address
   * @property {string} zip
   * @property {string} state
   * @property {string} country
   * @property {string} phone
   * @property {string} photo
   * @property {() => string } formattedAddress
   */

  /**
   * @param {UserData} data
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.username = data.username;
    this.email = data.email;
    this.address = data.address;
    this.zip = data.zip;
    this.state = data.state;
    this.country = data.country;
    this.phone = data.phone;
    this.photo = data.photo;
  }

  /** @returns {string} */
  get formattedAddress() {
    return `${this.address}, ${this.state} ${this.zip}, ${this.country}`;
  }
}