//bringing in the appropriate npm packages to power the application
var mysql = require("mysql");
var inquirer = require("inquirer");

//connecting to MySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_DB"
});

//confirming connection and also calling the displayAll function
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    displayAll();
});

//Display all the items available for sale for the user
function displayAll() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("-----------------------------");
            console.log("ID | Product | Department | Price")
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
        };
        //calling start function, which will then prompt user to make selections based upon seeing all products for sale
        start();
    });
}


function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        // console.log(res);
        //prompting user with two messages: 
        //1. what product would they like to purchase
        //2. how many items of that product would they like to purchase
        inquirer.prompt([{
                    name: "productId",
                    type: "input",
                    message: "What is the ID of the product you'd like to buy?"
                },
                {
                    name: "purchaseQuantity",
                    type: "input",
                    message: "How many units of this product would you like to buy?",
                    //validation in place to confirm user actually input a number to indicate "amount" to purchase
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function(answer) {
                //incremental console logging to confirm I can grab the needed information:
                // console.log("The user has selected item_id (productId): " + answer.productId);
                // console.log("The user wants to buy " + answer.purchaseQuantity + " unit(s) of this item");
                // console.log("Product Name: " + res[4].product_name);
                // console.log("Jeans price: " + res[4].price);
                // console.log("Jeans quantity: " + res[4].stock_quantity);

                //creating a variable to hold the productID(item_id) that the user has selcted
                var userItem = answer.productId;
                //calling order function and passing in the item the user selected and also the quantity they wish to purchase
                order(userItem, parseInt(answer.purchaseQuantity));

            })

    })

}; 


function order(productId, quantity) {
    // console.log('product ID -----', productId);
    connection.query("SELECT * FROM products WHERE item_id =" + productId, function(err, res) {
        if (err) throw err;
        var availableQuantity = res[0].stock_quantity;
        var currentPrice = parseInt(res[0].price);

        //checking to see if there is enough quantity of the item to fulfill the user's purchase
        if (quantity <= availableQuantity) {
            //console.log('this is the item from DB', res[0]);
            //calculating the new depricated stock quantity, based upon the user input value of how many units they want to purchase
            var newStockQuantity = (availableQuantity - quantity);
            // console.log("New stock quantity= " + newStockQuantity);

            //console.log('this is availableQuantity ----', availableQuantity);
            //console.log('this is quantity ----', quantity);
            //updating the new quantity in database
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