import { Router } from "express";
import * as Resource from "./facade/controllers/ResourcesController.js";
import * as User from "./facade/controllers/UsersController.js";

const router = Router();

router.get("/resources", Resource.index);
router.get("/resources/:id", Resource.show);
router.post("/resources", Resource.create);
router.put("/resources/:id", Resource.update);
router.delete("/resources/:id", Resource.destroy);

router.get("/users/:id", User.show);
router.post("/users", User.create);
router.put("/users/:id", User.update);
router.post("/users/authenticate", User.authenticate);
router.post("/users/logout", User.logout);


export default router;