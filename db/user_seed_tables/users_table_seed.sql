create table if not exists users (
    id serial primary key,
    email varchar(180) not null,
    first_name varchar(180),
    last_name varchar(180),
    birthday text,
    auth_id text
);
