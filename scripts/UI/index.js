import { UserHandler } from "./UIHandlers/userHandler.js";
import { ProfileHandler } from "./UIHandlers/profileHandler.js";


$(document).ready(async () => {
  if ($("#user-container").is(":visible")) {
    const userHandler = new UserHandler();
    await userHandler.initialize();
  }

  if ($("#profile-container").is(":visible")) {
    const profileHandler = new ProfileHandler();
    await profileHandler.initialize();
  }
});
