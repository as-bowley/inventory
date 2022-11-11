// Get arguments passed on command line
// var userArgs = process.argv.slice(2);
// if (!userArgs[0].startsWith("mongodb")) {
//   console.log(
//     "ERROR: You need to specify a valid mongodb URL as the first argument"
//   );
//   return;
// }
var async = require("async");
var Item = require("./models/item");
var Category = require("./models/category");
var Team = require("./models/team");
var Size = require("./models/size");

var mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://steve:nLrps15QAi2EcFct@cluster0.xhnblsf.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var items = [];
var categories = [];
var teams = [];
var sizes = [];

function itemCreate(name, description, price, stock, size, category, team, cb) {
  var item = new Item({
    name: name,
    description: description,
    price: price,
    stock: stock,
    size: size,
    category: category,
    team: team,
  });

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function categoryCreate(name, cb) {
  var category = new Category({ name: name });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function teamCreate(name, sport, nationality, league, cb) {
  var team = new Team({
    name: name,
    sport: sport,
    nationality: nationality,
    league: league,
  });

  team.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Team: " + team);
    teams.push(team);
    cb(null, team);
  });
}

function sizeCreate(size, cb) {
  var size = new Size({
    size: size,
  });

  size.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Size: " + size);
    sizes.push(size);
    cb(null, size);
  });
}

function createSizes(cb) {
  async.parallel(
    [
      function (callback) {
        sizeCreate("Small", callback);
      },
      function (callback) {
        sizeCreate("Medium", callback);
      },
      function (callback) {
        sizeCreate("Large", callback);
      },
      function (callback) {
        sizeCreate("XL", callback);
      },
    ],
    // Optional callback
    cb
  );
}

function createCategories(cb) {
  async.parallel(
    [
      function (callback) {
        categoryCreate("Shirts", callback);
      },
      function (callback) {
        categoryCreate("Shorts", callback);
      },
      function (callback) {
        categoryCreate("Socks", callback);
      },
      function (callback) {
        categoryCreate("Other", callback);
      },
    ],
    // Optional callback
    cb
  );
}

function createItems(cb) {
  async.series(
    [
      function (callback) {
        itemCreate(
          "Manchester United Home Shirt 2022/23",
          "The Home Shirt of Manchester United for the 2022/23 Season.",
          49.99,
          5,
          sizes[2],
          categories[0],
          teams[0],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Manchester United Away Shirt 2022/23",
          "The Away Shirt of Manchester United for the 2022/23 Season.",
          49.99,
          4,
          sizes[1],
          categories[0],
          teams[0],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Manchester United 3rd Shirt 2022/23",
          "The 3rd Shirt of Manchester United for the 2022/23 Season.",
          49.99,
          5,
          sizes[3],
          categories[0],
          teams[0],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Manchester United Home Shorts 2022/23",
          "The Home Shorts of Manchester United for the 2022/23 Season.",
          49.99,
          5,
          sizes[0],
          categories[1],
          teams[0],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Arsenal Home Shorts 2022/23",
          "The Home Shirt of Arsenal for the 2022/23 Season.",
          49.99,
          5,
          sizes[1],
          categories[1],
          teams[1],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Burnley Away Shirt 2022/23",
          "The Away Shirt of Burnley for the 2022/23 Season.",
          49.99,
          5,
          sizes[2],
          categories[0],
          teams[4],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Leicester City Home Shirt 2022/23",
          "The Home Shirt of Leicester City for the 2022/23 Season.",
          49.99,
          5,
          sizes[1],
          categories[0],
          teams[5],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Manchester United Home Socks 2022/23",
          "The Home Socks of Manchester United for the 2022/23 Season.",
          49.99,
          5,
          sizes[3],
          categories[2],
          teams[0],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Leeds United Home Shirt 2022/23",
          "The Home Shirt of Leeds United for the 2022/23 Season.",
          49.99,
          5,
          sizes[0],
          categories[0],
          teams[3],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createTeams(cb) {
  async.parallel(
    [
      function (callback) {
        teamCreate(
          "Manchester United",
          "Football",
          "England",
          "Premier League",
          callback
        );
      },
      function (callback) {
        teamCreate(
          "Arsenal",
          "Football",
          "England",
          "Premier League",
          callback
        );
      },
      function (callback) {
        teamCreate(
          "Manchester City",
          "Football",
          "England",
          "Premier League",
          callback
        );
      },
      function (callback) {
        teamCreate(
          "Leeds United",
          "Football",
          "England",
          "Premier League",
          callback
        );
      },
      function (callback) {
        teamCreate(
          "Burnley",
          "Football",
          "England",
          "Premier League",
          callback
        );
      },
      function (callback) {
        teamCreate(
          "Leicester City",
          "Football",
          "England",
          "Premier League",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createSizes, createCategories, createTeams, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Items: " + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
