select spells.* from spells join character_spells
on character_spells.spell_id = spells.id
where character_spells.character_id = $1;
