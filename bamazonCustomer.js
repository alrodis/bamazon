var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_DB"
});

//confirming connection
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    //starting the application by displaying all items available for sale
    displayAll();
});

//Display all the items available for sale
function displayAll() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("-----------------------------");
            console.log("ID | Product | Department | Price")
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
        };
        //once all items are displayed, user can then make a purchase, calling start function
        start();
    });
}


function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        // console.log(res);
        //prompting user with two messages: what product they'd like to buy and how many units of each would they like to purchase
        inquirer.prompt([{
                    name: "productId",
                    type: "input",
                    message: "What is the ID of the product you'd like to buy?"
                },
                {
                    name: "purchaseQuantity",
                    type: "input",
                    message: "How many units of this product would you like to buy?",
                    //validating that the response of amount to purchase is actually a number, if it isn't user can't move on
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function(answer) {
                //incremental console logging to confirm I can grab the needed information

                // console.log("The user has selected item_id (productId): " + answer.productId);
                // console.log("The user wants to buy " + answer.purchaseQuantity + " unit(s) of this item");
                // console.log("Product Name: " + res[4].product_name);
                // console.log("Jeans price: " + res[4].price);
                // console.log("Jeans quantity: " + res[4].stock_quantity);

                var userItem = answer.productId;
                order(userItem, parseInt(answer.purchaseQuantity));

            })

    })

}; //closes the start function...


function order(productId, quantity) {
    // console.log('product ID -----', productId);
    connection.query("SELECT * FROM products WHERE item_id =" + productId, function(err, res) {
        if (err) throw err;
        var availableQuantity = res[0].stock_quantity;
        var currentPrice = parseInt(res[0].price);

        //first step is to confirm the customer can actually place an order, based upon checking the total quantity in stock vs. the amount the user would like to purchase
        if (quantity <= availableQuantity) {
            //console.log('this is the item from DB', res[0]);
            //calculating the new depricated stock quantity, based upon the user input value of how many they want to purchase
            var newStockQuantity = (availableQuantity - quantity);
            // console.log("New stock quantity= " + newStockQuantity);

            //console.log('this is availableQuantity ----', availableQuantity);
            //console.log('this is quantity ----', quantity);
            connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newStockQuantity
                },
                {
                    item_id: productId
                }
            ]);

            //calculating the total cost of the order, based upon the quantity the user wants to purchase
            var totalCost = (quantity * currentPrice);
            // console.log(totalCost);
            //now we will give the user the total cost of their order
            console.log("Thank you for your order.  Your total cost is: " + totalCost);
        } else {
            //if there is insufficient quantity in stock, the order will not go through and the user will go back to the start to make a new selection
            console.log("-----------------------------------------------------------------------------");
            console.log("Sorry, we do not have enough stock to complete your order.  Please try again.");
            start();
        }
    })

}