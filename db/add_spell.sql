insert into character_spells (character_id, spell_id) values ($1, $2);
select * from character_spells where character_id = $1;
