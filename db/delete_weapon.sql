delete from character_weapons where id = $1;
select character_weapons.id as cw_id, weapons.*
from character_weapons join weapons  
on character_weapons.weapon_id = weapons.id
where character_weapons.character_id = $2;
