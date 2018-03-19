create table if not exists alignments (
    id serial primary key,
    alignment varchar(100) not null,
    info text not null
);
