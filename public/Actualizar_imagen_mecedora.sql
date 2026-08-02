begin;

update public.regalos
set imagen_url = '/mecedora.png'
where visible_web is true
  and trim(item) = 'Mecedora';

commit;

select item, imagen_url
from public.regalos
where visible_web is true
  and trim(item) = 'Mecedora';
