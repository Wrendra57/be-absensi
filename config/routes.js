const express = require("express");
const controllers = require("../app/controllers");

const apiRouter = express.Router();
const cron = require("node-cron");
const middleware = require("../app/middleware/authorization");
/**
 * TODO: Implement your own API
 *       implementations
 */
// apiRouter.get("/api/v1/posts", controllers.api.v1.postController.list);
// apiRouter.post("/api/v1/posts", controllers.api.v1.postController.create);
// apiRouter.put("/api/v1/posts/:id", controllers.api.v1.postController.update);
// apiRouter.get("/api/v1/posts/:id", controllers.api.v1.postController.show);
// apiRouter.delete(
//   "/api/v1/posts/:id",
//   controllers.api.v1.postController.destroy
// );
apiRouter.get("/", (req, res) => {
  return res.status(200).json({ status: "OK", message: "Server Already" });
});
apiRouter.post(
  "/api/v1/auth/register",
  controllers.api.v1.userController.createUser
);
apiRouter.post("/api/v1/auth/login", controllers.api.v1.userController.login);

apiRouter.post(
  "/api/v1/absen/check/:time",
  middleware.parseToken,
  controllers.api.v1.absensiController.checkAbsenC
);
/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
