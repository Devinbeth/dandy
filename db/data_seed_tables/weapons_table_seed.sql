create table if not exists weapons (
    id serial primary key,
    category varchar(100) not null,
    name varchar(100) not null,
    cost varchar(100) not null,
    damage varchar(100) not null,
    weight varchar(100) not null,
    properties varchar(100) not null
);
