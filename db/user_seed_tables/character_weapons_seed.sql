create table if not exists character_weapons (
    id serial primary key,
    character_id integer not null references characters(id),
    weapon_id integer not null references weapons(id),
    attack_bonus integer
);
