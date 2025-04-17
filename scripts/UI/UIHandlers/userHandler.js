import { UserService } from "../services/userService.js";
import Storage from "../utils/storage.js";
import { BaseHandler } from "./baseHandler.js";

export class UserHandler extends BaseHandler {

  constructor() {
    super();
    this.userService = new UserService();
    this.$container = $("#user-container");
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

    this.userService.users.forEach((user) => {
      const $userCard = $(`
        <div class="user-card">
          <img src="${user.photo}" alt="${user.name}'s photo">
          <div class="user-info">
            <h3>${user.name}</h3>
            <p>${user.company}</p>
            <p>${user.email}</p>
            <p>${user.formattedAddress}</p>
            <p>${user.phone}</p>
            <button class="btn btn-primary view-detail" data-user-id="${user.id}">View Details</button>
          </div>
        </div>
      `);

      this.$container.append($userCard);
    });
  }

  bindEvents() {
    this.$container.on('click', '.view-detail', (event) => {
      const userId = $(event.currentTarget).data('userId');
      this.navigateToDetail(userId);
    });
  }

  navigateToDetail(userId) {
    Storage.setPolicyNumber(userId);
    window.location.href = "profile.html";
  }
}
