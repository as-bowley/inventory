const Size = require("../models/size");
const Item = require("../models/item");
const async = require("async");

// Display list of all Sizes.
exports.size_list = (req, res) => {
  Size.find({}, "size")
    .sort({ size: 1 })
    .exec(function (err, list_sizes) {
      if (err) {
        return next(err);
      }
      res.render("size_list", { title: "Size List", size_list: list_sizes });
    });
};

// Display detail page for a specific Size.
exports.size_detail = (req, res, next) => {
  async.parallel(
    {
      size(callback) {
        Size.findById(req.params.id).exec(callback);
      },
      size_items(callback) {
        Item.find({ size: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.size == null) {
        const err = new Error("No items in that size available.");
        err.status = 404;
        return next(err);
      }
      res.render("size_detail", {
        title: "Items available in this size.",
        size: results.size,
        size_items: results.size_items,
      });
    }
  );
};

// Display Size create form on GET.
exports.size_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Size create GET");
};

// Handle Size create on POST.
exports.size_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Size create POST");
};

// Display Size delete form on GET.
exports.size_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Size delete GET");
};

// Handle Size delete on POST.
exports.size_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Size delete POST");
};

// Display Size update form on GET.
exports.size_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Size update GET");
};

// Handle Size update on POST.
exports.size_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Size update POST");
};
