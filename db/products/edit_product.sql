UPDATE ecommerce_products
SET 
name = ${name},
price = ${price},
description = ${description}
WHERE product_id = ${product_id};

SELECT * FROM ecommerce_products 
ORDER BY product_id ASC;

--If we edit a product it puts it at the top of the table, I think.