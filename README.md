# bamazon

I have created an Amazon-like storefront, integrating node.js with MySQL.  The app will take in orders from customers and deplete stock from the store's inventory. 

## bamazon Video

I've created a video of the app in action, showing it working without any bugs
* [bamazon Video](https://github.com/alrodis/bamazon/blob/master/bamazon_video/bamazon.mov)-check it out!

The video will demonstrate the following:
* Display of all items available for sale
* The user will be prompted to enter the ID of the product they'd like to buy
* The user will then be prompted to enter the quantity of the product they'd like to buy
* The initial example will show what happens when a user inputs a desired quantity that is greater than the quantity in stock
* The user will once again be prompted to select and item ID and quantity
* This time the user's transaction is successful and they are presented with the total purchase price
* I have also included a successful update of the database, based upon the quantity entered by a user, following a successful transaction

## Getting Started

* Ensure node.js and MySQL are connected

### Prerequisites

* Ensure that the following npm packages are installed:

```
* mysql
* inquirer
```
## Built With

* [Node.js](https://nodejs.org/en/) - open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.
* [MySQL](https://www.mysql.com/) - open-source relational database management system
* [mysql npm package](https://www.npmjs.com/package/mysql) - node.js driver for mysql
* [inquirer npm package](https://www.npmjs.com/package/inquirer) - a collection of common interactive command line user interfaces.

## Authors

* **Al Rodis** [Github](https://github.com/alrodis)

## Acknowledgments

* Big, big thanks to Tutor Eric King and T.A. Tom for getting me past the finish line!!
