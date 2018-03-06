create table if not exists character_spells (
    id serial primary key,
    character_id integer not null references characters(id),
    spell_id integer not null references spells(id),
);
