delete from character_armor where id = $1;
select character_armor.id as ca_id, armor.*
from armor join character_armor  
on character_armor.armor_id = armor.id
where character_armor.character_id = $2;

