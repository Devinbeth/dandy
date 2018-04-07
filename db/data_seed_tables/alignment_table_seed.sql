create table if not exists alignment (
    id serial primary key,
    alignment varchar(100) not null,
    info text not null,
    example text not null
);
