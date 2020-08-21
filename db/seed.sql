-- dummy data

INSERT INTO ecommerce_users 
(email, password)
VALUES
('test', 'test');

INSERT INTO ecommerce_products
(name, price, description)
VALUES
('snickers', 1, 'hungry? not anymore son'),
('nerds', 30, 'good luck finding us in your couch'),
('big hunk', 2, 'insert joke about cole here'),
('skittles', 1, 'rainbows coming out of places you don''t want them coming out of');

INSERT INTO ecommerce_cart
(user_id, product_id)
VALUES
(1, 1),
(1, 2),
(1, 2),
(1, 4);