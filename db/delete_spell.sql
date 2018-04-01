delete from character_spells where id = $1;
select character_spells.id as cs_id, spells.*
from spells join character_spells
on character_spells.spell_id = spells.id
where character_spells.character_id = $2;
