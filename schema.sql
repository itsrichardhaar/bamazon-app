CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT(10) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT (100) NOT NULL,
  PRIMARY KEY (item_id)
);

Select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("iPhone X", "Electronics", 1000.00, 10),
("iPad Pro", "Electronics", 800.00, 10),
("MacBook Pro", "Electronics", 2500.00, 5),
("XBox One", "Electronics", 299.99, 8),
("Playstation 4", "Electronics", 299.99, 8),
("Dishes", "Kitchen", 25.00, 10),
("Monopoly", "Games", 15.00, 100),
("Jump Rope", "Outdoors", 10.00, 200),
("Tent", "Camping", 80.00, 40),
("Rolex Watch", "Jewelry", 2000.00, 20),
("iPhone X Case", "Electronics", 20.99, 100),
("Curtains", "Home", 39.99, 72),
("Table", "Home", 80.00, 77),
("'The Rolling Stones' Vinyl Record", "Music", 100.00, 5),
("Car Mat - 4 Pack", "Automobile", 30.00, 107),
("Keurig", "Kitchen", 55.00, 15),
("Dish Soap - 2 Pack", "Kitchen", 10.00, 300);


