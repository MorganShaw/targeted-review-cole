INSERT INTO ecommerce_products 
(name, price, description)
VALUES
(${name}, ${price}, ${description});

SELECT * FROM products
ORDER BY product_id ASC;

--If you do your values like this, the data that goes into the databse query (in the controller file) has to be an object. So you wouldn't put them in square brackets - it would be curly brackets.