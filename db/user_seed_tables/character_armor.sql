create table if not exists character_armor (
    id serial primary key,
    character_id integer not null references characters(id),
    armor_id integer not null references armor(id)
);
