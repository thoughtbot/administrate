SELECT customers.*, COALESCE(SUM(line_items.unit_price * line_items.quantity), 0) as lifetime_value
FROM
  customers
  LEFT JOIN orders ON customers.id = orders.customer_id
  LEFT JOIN line_items ON orders.id = line_items.order_id
GROUP BY customers.id
