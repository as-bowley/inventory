const express = require("express");
const router = express.Router();

// Require controller modules.
const item_controller = require("../controllers/itemController");
const size_controller = require("../controllers/sizeController");
const category_controller = require("../controllers/categoryController");
const team_controller = require("../controllers/teamController");

/// ITEM ROUTES ///

// GET catalog home page.
router.get("/", item_controller.index);

// GET request for creating an Item. NOTE This must come before routes that display Item (uses id).
router.get("/item/create", item_controller.item_create_get);

// POST request for creating item.
router.post("/item/create", item_controller.item_create_post);

// GET request to delete item.
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST request to delete item.
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET request to update item.
router.get("/item/:id/update", item_controller.item_update_get);

// POST request to update item.
router.post("/item/:id/update", item_controller.item_update_post);

// GET request for one item.
router.get("/item/:id", item_controller.item_detail);

// GET request for list of all item items.
router.get("/items", item_controller.item_list);

/// Category ROUTES ///

// GET request for creating Category. NOTE This must come before route for id (i.e. display category).
router.get("/category/create", category_controller.category_create_get);

// POST request for creating category.
router.post("/category/create", category_controller.category_create_post);

// GET request to delete category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request to delete category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request to update category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update category.
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all categorys.
router.get("/categories", category_controller.category_list);

/// TEAM ROUTES ///

// GET request for creating a Team. NOTE This must come before route that displays Team (uses id).
router.get("/team/create", team_controller.team_create_get);

//POST request for creating team.
router.post("/team/create", team_controller.team_create_post);

// GET request to delete team.
router.get("/team/:id/delete", team_controller.team_delete_get);

// POST request to delete team.
router.post("/team/:id/delete", team_controller.team_delete_post);

// GET request to update team.
router.get("/team/:id/update", team_controller.team_update_get);

// POST request to update team.
router.post("/team/:id/update", team_controller.team_update_post);

// GET request for one team.
router.get("/team/:id", team_controller.team_detail);

// GET request for list of all team.
router.get("/teams", team_controller.team_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a Size. NOTE This must come before route that displays Size (uses id).
router.get("/size/create", size_controller.size_create_get);

// POST request for creating size.
router.post("/size/create", size_controller.size_create_post);

// GET request to delete size.
router.get("/size/:id/delete", size_controller.size_delete_get);

// POST request to delete size.
router.post("/size/:id/delete", size_controller.size_delete_post);

// GET request to update size.
router.get("/size/:id/update", size_controller.size_update_get);

// POST request to update size.
router.post("/size/:id/update", size_controller.size_update_post);

// GET request for one size.
router.get("/size/:id", size_controller.size_detail);

// GET request for list of all sizes.
router.get("/sizes", size_controller.size_list);

module.exports = router;
