insert into character_weapons (character_id, weapon_id, attack_bonus, proficient, strdex) values ($1, $2, $3, $4, $5);
select * from character_weapons where character_id = $1;
