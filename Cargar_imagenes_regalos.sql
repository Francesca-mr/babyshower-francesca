-- Imágenes obtenidas desde las páginas de referencia de WishList Web
begin;
alter table public.regalos add column if not exists imagen_url text;
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/005/583/623/products/9-8c7e0f749b1a00bc4517685254778129-640-0.webp' where visible_web = true and trim(item) = 'Cambiador de silicona';
update public.regalos set imagen_url = 'https://carestino.cc/_next/image/?url=https%3A%2F%2Fcarestino.cc%2Fuploads%2Fproductos_imagen_1_7274_ar-1770163808.jpg&w=1920&q=75' where visible_web = true and trim(item) = 'Bañera bebé';
update public.regalos set imagen_url = 'https://carestino.cc/_next/image/?url=https%3A%2F%2Fcarestino.cc%2Fuploads%2Fproductos_imagen_1_7248_ar-1749842851.jpg&w=1920&q=75' where visible_web = true and trim(item) = 'Toallas con capucha';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/006/630/293/products/captura-de-pantalla-2026-03-21-a-las-2-17-22p-m-0f71f5ea9f92a312fb17741135343152-640-0.webp' where visible_web = true and trim(item) = 'Cepillo y peine de cabello';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/006/630/293/products/captura-de-pantalla-2026-04-28-a-las-3-29-17p-m-249aadbae2090addf017774012552886-640-0.webp' where visible_web = true and trim(item) = 'lima/cortauñas bebé';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/006/630/293/products/captura-de-pantalla-2026-04-28-a-las-3-10-55p-m-2121b2fae422ca757017774005889059-640-0.webp' where visible_web = true and trim(item) = 'Aspirador nasal';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/006/630/293/products/captura-de-pantalla-2026-04-17-a-las-2-35-24p-m-d1e1f1432f2324425217764474896654-640-0.webp' where visible_web = true and trim(item) = 'Basurero para pañales';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/006/407/902/products/set-basico-21de7dc16218ad4e6d17546807805541-640-0.webp' where visible_web = true and trim(item) = 'Almohadon de lactancia + Pad mamario frio/calor';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/002/925/784/products/incluye-una-consulta-con-nuestras-pueris-2-9b6b4a0cd867f11c5617817294153169-640-0.webp' where visible_web = true and trim(item) = 'Sacaleche manos libres + bolsitas para heladera';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/001/114/456/products/img_2938-c5ee4d2e1aafd7042d17301297426022-640-0.webp' where visible_web = true and trim(item) = 'Sábanas bajeras ajustables';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/001/076/399/products/img_3687-069f6d4024c9b2bbd217738730718317-640-0.webp' where visible_web = true and trim(item) = 'Protectores impermeables para colchón (Moises)';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/001/076/399/products/img_3687-069f6d4024c9b2bbd217738730718317-640-0.webp' where visible_web = true and trim(item) = 'Protectores impermeables para colchón (Colecho)';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/001/076/399/products/img_3687-069f6d4024c9b2bbd217738730718317-640-0.webp' where visible_web = true and trim(item) = 'Protectores impermeables para colchón (Cuna evolutiva)';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/001/061/050/products/img_0356_snapseedcopy-10847b3469bde931bc17576350888025-640-0.webp' where visible_web = true and trim(item) = 'Bolsa de dormir';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/004/533/070/products/tmp_b64_334a0776-69ee-4306-8744-3d834e3387ab_4533070_4699438-941edee35256bea7ec17797270894045-640-0.webp' where visible_web = true and trim(item) = 'Almohadón antireflujo';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/006/630/293/products/captura-de-pantalla-2026-04-28-a-las-3-57-54p-m-f7d2d421bf703e549a17774036108901-640-0.webp' where visible_web = true and trim(item) = 'Baby Call';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/006/528/527/products/1-ba658e95c0e4eee40817726856591503-640-0.webp' where visible_web = true and trim(item) = 'Luz nocturna tenue';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/268/422/products/img_8573-17b8439d12c298681717811851672570-640-0.webp' where visible_web = true and trim(item) = 'Nido Contención / Nido Mochila';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/001/061/050/products/img_20210403_1644421-d3eec651cc130d4a6a16593625830795-640-0.webp' where visible_web = true and trim(item) = 'Chichonera Funcional:  Cuna-Colecho - Moises';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/001/181/396/products/lamb-feb-137-de-242-f1580d5733e4495c3917398519476974-640-0.webp' where visible_web = true and trim(item) = 'Bolsillero para cuna-colecho';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/001/181/396/products/1090-logo-1024-x-1800-px-f3a436ea2cd9d1bda717197586517181-640-0.webp' where visible_web = true and trim(item) = 'Organizadores';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/213/799/products/foto-18-5-26-15-56-34-9398af7bb0e6f23ef417791309513043-640-0.webp' where visible_web = true and trim(item) = 'Decoración habitación arcoiris';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/792/873/products/img_9553-c91cbe9ef2b2ba20d317749659186607-640-0.webp' where visible_web = true and trim(item) = 'Pijama';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/001/061/050/products/24766289-a2f0-4a4f-bae1-768cfba4c13f-d83792e712f456398717792158365876-640-0.webp' where visible_web = true and trim(item) = 'Funda de huevito / Reductor de huevito';
update public.regalos set imagen_url = 'https://carestino.cc/_next/image/?url=https%3A%2F%2Fcarestino.cc%2Fuploads%2Fproductos_imagen_1_7262_ar-1774615260.jpg&w=1920&q=75' where visible_web = true and trim(item) = 'Alfombra de juego';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/001/284/033/products/5-libro-sensorial-jardin-f48f53f186359074ac17408761374136-640-0.webp' where visible_web = true and trim(item) = 'Libro sensorial';
update public.regalos set imagen_url = 'http://acdn-us.mitiendanube.com/stores/006/045/078/products/3era-base-2025-04-03t134325-853-5bb8f22c1013edece217525222078254-640-0.webp' where visible_web = true and trim(item) = 'Silla para comer';
commit;

select item, imagen_url
from public.regalos
where visible_web = true
order by categoria, item;
