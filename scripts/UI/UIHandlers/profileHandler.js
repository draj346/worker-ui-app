import { UserService } from "../services/userService.js";
import Storage from "../utils/storage.js";
import { BaseHandler } from "./baseHandler.js";

export class ProfileHandler extends BaseHandler {
  constructor() {
    super();
    this.userService = new UserService();
    this.$container = $("#profile-container");
    this.bindEvents();
  }

  async initialize() {
    try {
      this.showLoading();
      await this.userService.loadUsers();
      this.renderUsers();
    } catch (error) {
      this.showError(error, this.$container);
    } finally {
      this.hideLoading();
    }
  }

  renderUsers() {
    this.$container.empty();

    const user = this.userService.users.find(
      (user) => user.id === Storage.getPolicyNumber()
    );
    if (!user) {
      this.$container.append("<p>User not found.</p>");
      return;
    }
    const $userCard = $(`
        <div class="user-card">
          <img src="${user.photo}" alt="${user.name}'s photo">
          <div class="user-info">
            <h3>${user.name}</h3>
            <p>${user.company}</p>
            <p>${user.email}</p>
            <p>${user.formattedAddress}</p>
            <p>${user.phone}</p>
            <button class="btn btn-primary btn-back">Back</button>
          </div>
        </div>
      `);

    this.$container.append($userCard);
  }

  bindEvents() {
    this.$container.on("click", ".btn-back", (event) => {
      window.location.href = "index.html";
    });
  }
}
