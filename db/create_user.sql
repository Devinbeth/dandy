insert into users (email, auth_id) values ($1, $2)
returning *;
