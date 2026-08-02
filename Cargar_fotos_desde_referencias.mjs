import { writeFile } from "node:fs/promises";

const products = [
  {
    "item": "Cambiador de silicona",
    "reference": "https://www.hanoihaus.com/productos/cambiador-de-silicona-con-juguetes-para-bebes-hanoi-haus-kids/"
  },
  {
    "item": "Bañera bebé",
    "reference": "https://www.carestino.com/producto/baniera-plegable-con-soporte-amalfi-50l-rosa/"
  },
  {
    "item": "Almohada flotadora",
    "reference": "https://articulo.mercadolibre.com.ar/MLA-1444757383-colchon-flotador-red-adaptador-banera-mullido-acolchado-2742-_JM?searchVariation=185071914595#polycard_client=search-desktop&be_origin=backend&searchVariation=185071914595&search_layout=grid&position=7&type=item&tracking_id=c33cd7eb-fd60-4936-a868-0dbd7075a407&sid=search"
  },
  {
    "item": "Toallas con capucha",
    "reference": "https://www.carestino.com/producto/toalla-con-capucha-75x75cm-tigre-almendra/"
  },
  {
    "item": "Cepillo y peine de cabello",
    "reference": "https://www.shop.maternelleonline.com/productos/set-cepillo-y-peine-buba-1ie8s/"
  },
  {
    "item": "lima/cortauñas bebé",
    "reference": "https://www.shop.maternelleonline.com/productos/lima-para-unas-electrica-momcozy-7oa8s/"
  },
  {
    "item": "Aspirador nasal",
    "reference": "https://www.shop.maternelleonline.com/productos/aspirador-nasal-electrico-momcozy-wrxev/"
  },
  {
    "item": "Mordedor refrescante",
    "reference": "https://www.mercadolibre.com.ar/mordillo-para-bebe-en-forma-de-manito-baby-innovation-color-rosa/p/MLA24313884?pdp_filters=item_id%3AMLA1459824056&gallery_type=horizontal&sizeForPhoto=416&pdp_filters=official_store%3A274262#polycard_client%3Drecommendations_recoview-selleritems-eshops%26wid%3DMLA1459824056%26sid%3Drecos%26reco_backend%3Dsame-seller-odin%26reco_client%3Drecoview-selleritems-eshops%26reco_item_pos%3D2%26reco_backend_type%3Dlow_level%26reco_id%3Da380a925-411f-4e52-b70c-186480010df5%26tracking_id%3D66d2f5fa51132353192f961040e466f5%26source%3Deshops%26seller_id%3D114882315%26category_id%3DMLA413241"
  },
  {
    "item": "Basurero para pañales",
    "reference": "https://www.shop.maternelleonline.com/productos/tacho-contenedor-de-panal-magic-majestic/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&utm_id=97760_v0_s00_e0_tv3&fbclid=PAdGRzdgS4q4JleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacnE673sjFLrlhlVHzM9TOdDIxABgq4JzokMN_aDCnXZ4rldcSVbiRNZ4oBVA_aem_cXn2KZ6XsuAaRvU-2NTc6w"
  },
  {
    "item": "Almohadon de lactancia + Pad mamario frio/calor",
    "reference": "https://paolalactancia.com.ar/productos/set-basico-almohadon-pads-cf8pq/"
  },
  {
    "item": "Sacaleche manos libres + bolsitas para heladera",
    "reference": "https://www.nursimom.com/productos/pack-discreet-plus-sacaleche-manos-libres-bolsitas-de-almacenamiento-x-50u/"
  },
  {
    "item": "Mamadera Avent",
    "reference": "https://www.mercadolibre.com.ar/philips-avent-natural-set-recien-nacido-color-blanco-scd-83811-natural-response/p/MLA35360872?pdp_filters=item_id%3AMLA1414685967&gallery_type=horizontal&sizeForPhoto=416&pdp_filters=official_store%3A629#polycard_client%3Drecommendations_recoview-selleritems-eshops%26wid%3DMLA1414685967%26sid%3Drecos%26reco_backend%3Dsame-seller-odin%26reco_client%3Drecoview-selleritems-eshops%26reco_item_pos%3D1%26reco_backend_type%3Dlow_level%26reco_id%3D2c0dd49f-713f-4565-8d77-0294d40362ed%26tracking_id%3D07596a67cffa80a684f6c53a8364e278%26source%3Deshops%26seller_id%3D20908304%26category_id%3DMLA5363"
  },
  {
    "item": "Sábanas bajeras ajustables",
    "reference": "https://www.mueblesmaschicos.com/productos/sabana-cuna-evolutiva/"
  },
  {
    "item": "Protectores impermeables para colchón (Moises)",
    "reference": "https://marticababy.com.ar/productos/protector-impermeable-para-colchon/?fbclid=PAVERTVgTE_dVleHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacTvP1tWPBrM6pv5kdLznxP8W3zMF99T2jsMr3WdgZnneK44YnskCz6coDmiw_aem_lOzKhehX2aVl_qEN4x9qGw"
  },
  {
    "item": "Protectores impermeables para colchón (Colecho)",
    "reference": "https://marticababy.com.ar/productos/protector-impermeable-para-colchon/?fbclid=PAVERTVgTE_dVleHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacTvP1tWPBrM6pv5kdLznxP8W3zMF99T2jsMr3WdgZnneK44YnskCz6coDmiw_aem_lOzKhehX2aVl_qEN4x9qGw"
  },
  {
    "item": "Protectores impermeables para colchón (Cuna evolutiva)",
    "reference": "https://marticababy.com.ar/productos/protector-impermeable-para-colchon/?fbclid=PAVERTVgTE_dVleHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacTvP1tWPBrM6pv5kdLznxP8W3zMF99T2jsMr3WdgZnneK44YnskCz6coDmiw_aem_lOzKhehX2aVl_qEN4x9qGw"
  },
  {
    "item": "Bolsa de dormir",
    "reference": "https://www.lajustina.com.ar/productos/bolsita-de-dormir-estampada-verano/"
  },
  {
    "item": "Almohadón antireflujo",
    "reference": "https://isabbs.mitiendanube.com/productos/almohadon-antirreflujo-regulable-matelasse/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&utm_id=97760_v0_s00_e0_tv3&fbclid=PAdGRzdgTWBH1leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaeRdfKkKK2j8z_PRh0H5wDHU0AoFodAp-4rsWGCUYKiiTNSZBHWy_84qJpW0A_aem_SQhsUqWG8vxM5CNazsrEmA"
  },
  {
    "item": "Baby Call",
    "reference": "1.https://www.shop.maternelleonline.com/productos/baby-call-monitor-smart-con-pantalla-y-app-momcozy-v6b1f/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&utm_id=97760_v0_s00_e0_tv3&fbclid=PAdGRzdgS4q6RleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacnE673sjFLrlhlVHzM9TOdDIxABgq4JzokMN_aDCnXZ4rldcSVbiRNZ4oBVA_aem_cXn2KZ6XsuAaRvU-2NTc6w                   2. https://bymichaimportados.ar/productos/momcozy-momcozy-monitor-de-bebe-inteligente-wifi-con-camara-y-audio-gcpum/"
  },
  {
    "item": "Luz nocturna tenue",
    "reference": "https://nukokids.com/productos/nuko-pear-glow/"
  },
  {
    "item": "Ruido Blanco",
    "reference": "1. https://www.mercadolibre.com.ar/maquina-de-ruido-blanco-gadnic-bluetooth-para-bebes/up/MLAU211234956?pdp_filters=item_id%3AMLA1108289957&matt_tool=89488245&ua=FxNR3FSrmyJ8IsaFHkdE19SCWC8297fWTcXcb_zA4iX0LQ#origin=whatsapp&sid=whatsapp&wid=MLA1108289957  2. https://nukokids.com/productos/nuko-big-rest/         3- https://bymichaimportados.ar/productos/momcozy-ruido-blanco-portatil-yrlug/"
  },
  {
    "item": "Nido Contención / Nido Mochila",
    "reference": "1. https://reybaltazar.mitiendanube.com/productos/nido-premium-1f3xp/              2. https://www.lajustina.com.ar/productos/mochinido-vicente/"
  },
  {
    "item": "Chichonera Funcional:  Cuna-Colecho - Moises",
    "reference": "https://www.lajustina.com.ar/productos/chichonera-cuna-funcional/"
  },
  {
    "item": "Bolsillero para cuna-colecho",
    "reference": "1 -    https://www.lamb.com.ar/productos/bolsillero-de-cuna/          2- https://www.mueblesmaschicos.com/productos/chichonera-tussor-natural/?variant=1112961830&_gl=1*ox41c0*_up*MQ..*_gs*MQ..&gclid=Cj0KCQjwjb3SBhDgARIsAMKiWzhDqbfoNM5Ye1fSAo7FciLyTFxArD7Q-qrLaA2BBwqZ5fgVNgqSR0gaApxcEALw_wcB&gbraid=0AAAAAD6mxH_z2kdWO4PRTX7Swk3-O7jrD"
  },
  {
    "item": "Organizadores",
    "reference": "https://www.lamb.com.ar/productos/organizador-liso/"
  },
  {
    "item": "Decoración habitación arcoiris",
    "reference": "https://www.ollieminideco.com.ar/productos/combo-arco-iris-bloques-name-aura-chvsd/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRzdgS_mSJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAafiMFyL1lHmBN21MKjFAbJAhTckcC2b0r5eP5YGLY_U9cBuU0fDLdQuNckXhQ_aem_TuPfVJrAfWX_fJJ0ACoELg"
  },
  {
    "item": "Pijama",
    "reference": "https://www.candekids.com.ar/productos/pijama-soft-vichy-mo29n/?variant=1490586246"
  },
  {
    "item": "Espejo para auto bebe",
    "reference": "1. https://www.wampi.com.ar/productos/monitor-de-bebe-para-auto-4-3-camara-simple-monitoreo-individual-hd/   2. https://www.mercadolibre.com.ar/espejo-auto-bebe-trasero-con-pantalla-de-vision-nocturna-hd/up/MLAU3699206854#polycard_client=search-desktop&be_origin=backend&overlay_label=not_apply&search_layout=grid&position=3&type=product&tracking_id=47b6e350-dc9b-4f12-9f64-7257c829b220&wid=MLA1618404245&sid=search"
  },
  {
    "item": "Funda de huevito / Reductor de huevito",
    "reference": "1. https://www.lajustina.com.ar/productos/funda-de-huevito-estampada/"
  },
  {
    "item": "Parasol ventanilla",
    "reference": "https://www.mercadolibre.com.ar/parasol-para-auto-con-sopapas-baby-innovation-infantil/up/MLAU219586444#polycard_client=search-desktop&be_origin=backend&overlay_label=not_apply&search_layout=grid&position=6&type=product&tracking_id=922291ea-713f-477d-9ee0-a27dedb242b5&wid=MLA1147714426&sid=search"
  },
  {
    "item": "Alfombra de juego",
    "reference": "https://www.carestino.com/producto/manta-didactica-animales-beige/"
  },
  {
    "item": "Alfombra Antigolpes Plegable",
    "reference": "https://www.mercadolibre.com.ar/alfombra-antigolpes-plegable-para-bebe-little-fun-con-diseno-reversible-pista-de-tren-abcd-120x180-cm/p/MLA61624860?product_trigger_id=MLA62821955&pdp_filters=item_id%3AMLA1643085087&applied_product_filters=MLA57778977&picker=true&quantity=1"
  },
  {
    "item": "Corralito",
    "reference": "https://www.mercadolibre.com.ar/corral-para-bebes-mawe-by-gadnic-120cm-alfombra-anillos-de-agarre-espuma-protectora/p/MLA67299516?pdp_filters=item_id:MLA3169577050#is_advertising=true&backend_model=search-backend&be_origin=backend&position=4&search_layout=grid&type=pad&tracking_id=66f23700-9a41-4a11-a430-30df286084c3&ad_domain=VQCATCORE_LST&ad_position=4&ad_click_id=MzkzYWQ3Y2EtODUzMi00ZmIwLWJiNWEtNTA3ZTZjNDc3YWYz"
  },
  {
    "item": "Gimnasio de actividades",
    "reference": "https://www.mercadolibre.com.ar/gimnasio-piano-manta-con-sonajeros-para-bebe/up/MLAU156691126?pdp_filters=item_id:MLA675034109#is_advertising=true&searchVariation=MLAU156691126&backend_model=search-backend&be_origin=backend&position=25&search_layout=grid&type=pad&tracking_id=35dbeb6a-b0fe-4f82-87d1-2ef41bf513ed&ad_domain=VQCATCORE_LST&ad_position=25&ad_click_id=NzgzYzdiODAtZDU4Ni00MzBiLTg3YWEtZmQxZWNlOGE2YjEy"
  },
  {
    "item": "Libro sensorial",
    "reference": "https://www.chauchitas.com.ar/productos/libro-sensorial-jardin/"
  },
  {
    "item": "Silla para comer",
    "reference": "https://creciendo.com/productos/Silla-De-Comer-Baby-Trend-Everlast-7-En-1-Alturas/"
  },
  {
    "item": "Esterilizador de mamaderas/biberones",
    "reference": "https://www.mercadolibre.com.ar/esterilizador-mamilas-biberon-vapor-philips-scf28102-avent-microondas/p/MLA32867955?pdp_filters=item_id%3AMLA1458256829&tracking_id=2f9f629f2d23019d317410907cb035dd#polycard_client=mshops-appearance-api&component=tabbed_carousel&wid=MLA1458256829&title=Env%C3%ADo+gratis&sid=storefronts&global_position=9"
  }
];

function firstUrl(text) {
  const match = text.match(/https?:\/\/[^\s]+/i);
  return match?.[0]?.replace(/[),.;]+$/g, "") ?? null;
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function metadataImage(html, pageUrl) {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return new URL(decodeHtml(match[1]), pageUrl).href;
  }
  return null;
}

function sqlText(value) {
  return "'" + String(value).replaceAll("'", "''") + "'";
}

const found = [];
const failed = [];

for (const [index, product] of products.entries()) {
  const url = firstUrl(product.reference);
  if (!url) {
    failed.push({ item: product.item, reason: "Sin URL utilizable" });
    continue;
  }

  process.stdout.write(`[${index + 1}/${products.length}] ${product.item}... `);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/150 Safari/537.36",
        "accept-language": "es-AR,es;q=0.9,en;q=0.7",
      },
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const image = metadataImage(html, response.url);
    if (!image) throw new Error("No se encontró og:image");
    found.push({ item: product.item, image });
    console.log("OK");
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    failed.push({ item: product.item, reason });
    console.log("PENDIENTE:", reason);
  }
}

const statements = found.map(({ item, image }) =>
  `update public.regalos set imagen_url = ${sqlText(image)} where visible_web = true and trim(item) = ${sqlText(item)};`
).join("\n");

const sql = `-- Imágenes obtenidas desde las páginas de referencia de WishList Web
begin;
alter table public.regalos add column if not exists imagen_url text;
${statements}
commit;

select item, imagen_url
from public.regalos
where visible_web = true
order by categoria, item;
`;

await writeFile("Cargar_imagenes_regalos.sql", sql, "utf8");
await writeFile("Imagenes_pendientes.txt", failed.length
  ? failed.map(({ item, reason }) => `- ${item}: ${reason}`).join("\n")
  : "No quedaron imágenes pendientes.", "utf8");

console.log(`\nListo: ${found.length} imágenes encontradas y ${failed.length} pendientes.`);
console.log("Se crearon Cargar_imagenes_regalos.sql e Imagenes_pendientes.txt");
