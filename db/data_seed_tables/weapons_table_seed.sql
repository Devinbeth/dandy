create table if not exists weapons (
    id serial primary key,
    category varchar(100) not null,
    name varchar(100) not null,
    cost varchar(100),
    damage varchar(100),
    weight varchar(100),
    properties varchar(100)
);
