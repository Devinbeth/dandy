create table if not exists spells (
    id serial primary key,
    name varchar(100) not null,
    level varchar(32) not null,
    components varchar(32) not null,
    material varchar(180) not null,
    casting_time varchar(32) not null,
    duration varchar(32) not null,
    range varchar(32) not null,
    save varchar(32) not null,
    school varchar(100) not null,
    classes varchar(180) not null,
    description text not null,
    higher_levels text not null
);
