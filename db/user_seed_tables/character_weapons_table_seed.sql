create table if not exists character_weapons (
    id serial primary key,
    character_id integer not null references characters(id),
    weapon_id integer not null references weapons(id),
    proficient boolean not null,
    strdex varchar(10) not null,
    attack_bonus integer not null
);
