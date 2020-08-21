SELECT c.cart_item_id, c.user_id, p.name, p.price, p.description FROM ecommerce_cart c
JOIN ecommerce_products p
ON c.product_id = p.product_id
WHERE c.user_id = $1;
