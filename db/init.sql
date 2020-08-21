--structure of the database
-- you could also have a unique cart_item_id and use that to delete out the specific item from user's cart. We didn't set that up here, though.

CREATE TABLE ecommerce_users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    password VARCHAR(250)
);

CREATE TABLE ecommerce_products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    price INT,
    description VARCHAR(500),
    image VARCHAR(300)
);

CREATE TABLE ecommerce_cart (
    cart_item_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES ecommerce_users(user_id),
    product_id INT REFERENCES ecommerce_products(product_id)
);