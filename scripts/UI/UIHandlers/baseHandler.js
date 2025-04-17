export class BaseHandler {
  constructor() {
    this.$loading = $("#loading-indicator");
  }

  showLoading() {
    this.$loading.show();
  }

  hideLoading() {
    this.$loading.hide();
  }

  showError(error, $container) {
    $container.html(`
      <div class="error-message">
        <h3>Error loading data</h3>
        <p>${error.message}</p>
        <button onclick="location.reload()">Retry</button>
      </div>
    `);
  }
}
