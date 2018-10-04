var Table = require('cli-table');
var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Z",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startPrompt();
});

function startPrompt() {

    inquirer.prompt([{

        type: "list",
        name: "actionList",
        message: "Welcome Manager. What would you like to see?",
        choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"]

    }]).then(function(user) {
        if (user.actionList === "View Products For Sale") {
            inventoryView();
        } else if (user.actionList === "View Low Inventory") {
            lowInventory();
        } else if (user.actionList === "Add To Inventory") {
            addInventory();
        } else {
            addProduct();
        }
    });
}

function inventoryView() {

    // instantiate
    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    listInventory();

    function listInventory() {

        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

                table.push(
                    [itemId, productName, departmentName, price, stockQuantity]
                );
            }
            console.log("Current Inventory");
            console.log(table.toString());
            startPrompt();
        });
    }
}

function lowInventory() {
    // instantiate
    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    listLowInventory();

    function listLowInventory() {

        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (res[i].stock_quantity <= 5) {

                    var itemId = res[i].item_id,
                        productName = res[i].product_name,
                        departmentName = res[i].department_name,
                        price = res[i].price,
                        stockQuantity = res[i].stock_quantity;

                    table.push(
                        [itemId, productName, departmentName, price, stockQuantity]
                    );
                }
            }
            console.log("Low Inventory");
            console.log(table.toString());
            startPrompt();
        });
    }
}

function addInventory() {

    inquirer.prompt([{

            type: "input",
            name: "inputId",
            message: "Please enter the product ID number.",
        },
        {
            type: "input",
            name: "inputNumber",
            message: "How many units of this item would you like to stock?",

        }
    ]).then(function(managerAdd) {

              connection.query("UPDATE products SET ? WHERE ?", [{

                  stock_quantity: managerAdd.inputNumber
              }, {
                  item_id: managerAdd.inputId
              }], function(err, res) {
              });
          startPrompt();
        });
      }

function addProduct() {

    inquirer.prompt([{

            type: "input",
            name: "inputName",
            message: "Please enter the name of the new product.",
        },
        {
            type: "input",
            name: "inputDepartment",
            message: "Please enter which department name.",
        },
        {
            type: "input",
            name: "inputPrice",
            message: "Please enter the price (0.00).",
        },
        {
            type: "input",
            name: "inputStock",
            message: "Please enter the stock quantity.",
        }

    ]).then(function(managerNew) {

      connection.query("INSERT INTO products SET ?", {
        product_name: managerNew.inputName,
        department_name: managerNew.inputDepartment,
        price: managerNew.inputPrice,
        stock_quantity: managerNew.inputStock
      }, function(err, res) {});
      startPrompt();
    });
  }