SELECT products.*, product_meta_tags.meta_title as product_meta_title
FROM
  products
  LEFT JOIN product_meta_tags ON products.id = product_meta_tags.product_id
