delete from character_weapons where character_id = $1;
delete from characters where id = $1 and user_id = $2;
select * from characters where user_id = $1;
