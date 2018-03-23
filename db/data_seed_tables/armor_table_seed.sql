create table if not exists armor (
    id serial primary key,
    category varchar(100) not null,
    name varchar(100) not null,
    cost varchar(100) not null,
    ac varchar(100) not null,
    strength varchar(100) not null,
    stealth varchar(100) not null,
    weight varchar(100) not null
);
