select armor.* from armor join characters_armor  
on character_armor.armor_id = armor.id
where character_armor.character_id = $1;
