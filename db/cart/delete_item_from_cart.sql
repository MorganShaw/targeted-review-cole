DELETE FROM ecommerce_cart
WHERE user_id = $1 AND product_id = $2;

-- This will delete all of that item (even if you want one of it) from your cart. You could also have a unique cart_item_id and use that to delete out the specific item from user's cart. We didn't set that up here, though. 