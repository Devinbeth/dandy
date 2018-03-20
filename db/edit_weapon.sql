update character_weapons set attack_bonus = $3 where id = $2;
select * from character_weapons where character_id = $1;
