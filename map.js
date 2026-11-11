// ------------------------------------------------------------
// Mapa měst ČR – Leaflet + GeoJSON
// ------------------------------------------------------------

const GEOJSON_URL = "body.geojson";

// Přibližný obdélník České republiky [[jih, západ], [sever, východ]]
const HRANICE_CR = [[48.55, 12.09], [51.06, 18.86]];

// Mapa
const mapa = L.map("mapa").fitBounds(HRANICE_CR);

// Podkladová mapa
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

// Vytvoří obsah popupu přes DOM (bezpečné proti vložení HTML z dat)
function vytvorPopup(vlastnosti) {
  const kontejner = document.createElement("div");
  kontejner.className = "popup";

  const nadpis = document.createElement("h2");
  nadpis.textContent = vlastnosti.nazev;

  const popisek = document.createElement("p");
  popisek.textContent = vlastnosti.popisek;

  const id = document.createElement("small");
  id.textContent = "ID: " + vlastnosti.id;

  kontejner.append(nadpis, popisek, id);
  return kontejner;
}

// Načtení GeoJSONu
fetch(GEOJSON_URL)
  .then((odpoved) => {
    if (!odpoved.ok) {
      throw new Error("HTTP " + odpoved.status);
    }
    return odpoved.json();
  })
  .then((data) => {
    const vrstva = L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        layer.bindPopup(vytvorPopup(feature.properties));
        layer.bindTooltip(feature.properties.nazev);
      }
    }).addTo(mapa);

    document.getElementById("pocet-mest").textContent =
      "Počet měst: " + data.features.length;

    // Přiblížení na načtené body
    if (data.features.length > 0) {
      mapa.fitBounds(vrstva.getBounds(), { padding: [60, 60] });
    }
  })
  .catch((chyba) => {
    console.error("Nepodařilo se načíst " + GEOJSON_URL, chyba);
    document.getElementById("pocet-mest").textContent =
      "Data se nepodařilo načíst. Spusťte projekt přes lokální server (viz readme).";
  });
