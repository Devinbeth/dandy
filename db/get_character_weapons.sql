select * from weapons where id in (select weapon_id from character_weapons where character_id = $1);
