create table if not exists races (
    id serial primary key,
    race varchar(100) not null,
    info text
);
