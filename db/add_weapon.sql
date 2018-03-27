insert into character_weapons (character_id, weapon_id) values ($1, $2);
select * from character_weapons where character_id = $1;
