select character_weapons.*, weapons.name, weapons.damage
from character_weapons join weapons  
on character_weapons.weapon_id = weapons.id
where character_weapons.character_id = $1;
