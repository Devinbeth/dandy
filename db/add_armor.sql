insert into character_armor (character_id, armor_id) values ($1, $2);
select * from character_armor where character_id = $1;
