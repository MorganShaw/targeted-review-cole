DELETE FROM ecommerce_products
WHERE
product_id = $1;

SELECT * FROM ecommerce_products
ORDER BY product_id ASC;