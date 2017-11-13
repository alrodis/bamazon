DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Widescreen Monitor", "Electronics", 250.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Electronics", 1000.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Joy of Coding", "Books", 15.75, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Definitely Maybe", "Music", 19.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Levi's Jeans", "Apparel", 29.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Winter Parka", "Apparel", 100.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Star Wars Episode IV", "Movies", 20.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rushmore", "Movies", 15.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Think Like a Developer", "Books", 24.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball Caps", "Apparel", 40.00, 11);

