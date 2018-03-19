create table if not exists classes (
    id serial primary key,
    class varchar(100) not null,
    info text
);
