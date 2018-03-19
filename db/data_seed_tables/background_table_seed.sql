create table if not exists background (
    id serial primary key,
    alignment varchar(100) not null,
    info text not null
);
