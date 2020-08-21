UPDATE ecommerce_products
SET 
name = $name,
price = $price,
description = $description
WHERE product_id = $product_id