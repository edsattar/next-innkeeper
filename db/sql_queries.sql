SELECT
  r.id,
  r.room_id,
  c.name,
  c.nationality,
  r.check_in,
  r.check_out,
  r.room_rate
FROM
  reservations as r
  LEFT JOIN customers as c ON r.customer_id = c.id;