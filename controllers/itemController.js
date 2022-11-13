const Item = require("../models/item");
const Category = require("../models/category");
const Size = require("../models/size");
const Team = require("../models/team");

const async = require("async");

exports.index = (req, res) => {
  async.parallel(
    {
      item_count(callback) {
        Item.countDocuments({}, callback);
      },
      category_count(callback) {
        Category.countDocuments({}, callback);
      },
      size_count(callback) {
        Size.countDocuments({}, callback);
      },
      team_count(callback) {
        Team.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Inventory Home",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all Items.
exports.item_list = (req, res) => {
  Item.find({}, "name price")
    .sort({ name: 1 })
    .populate("price")
    .exec(function (err, list_items) {
      if (err) {
        return next(err);
      }
      res.render("item_list", { title: "Item List", item_list: list_items });
    });
};

// Display detail page for a specific Item.
exports.item_detail = (req, res, next) => {
  async.parallel(
    {
      item(callback) {
        Item.findById(req.params.id)
          .populate("name")
          .populate("description")
          .populate("price")
          .populate("stock")
          .populate("size")
          .exec(callback);
      },
      item_size(callback) {
        Size.findById(req.params.size).populate("size").exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.item == null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }
      res.render("item_detail", {
        title: results.item.name,
        item: results.item,
        size: results.item_size,
      });
    }
  );
};

// Display Item create form on GET.
exports.item_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item create GET");
};

// Handle Item create on POST.
exports.item_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item create POST");
};

// Display Item delete form on GET.
exports.item_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
};

// Handle Item delete on POST.
exports.item_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
};

// Display Item update form on GET.
exports.item_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item update GET");
};

// Handle Item update on POST.
exports.item_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item update POST");
};
