# Mapa měst ČR

Jednoduchá webová mapa postavená na knihovně [Leaflet](https://leafletjs.com/).
Body měst se načítají ze souboru GeoJSON.

## Struktura projektu

```
mapa-mest/
├── index.html     # stránka, načítá Leaflet a vlastní soubory
├── map.js         # inicializace mapy a načtení GeoJSONu
├── styl.css       # vzhled stránky a popupů
├── body.geojson   # data (města)
└── readme.md      # tento soubor
```

## Spuštění

Prohlížeče blokují načítání souborů přes `fetch()` při otevření stránky
přímo ze souboru (`file://`). Projekt proto spusťte přes lokální server.

V adresáři projektu zadejte například:

```bash
# Python 3
python -m http.server 8000

# nebo Node.js
npx serve
```

Poté otevřete <http://localhost:8000>.

Lze použít i rozšíření **Live Server** ve VS Code.

## Datový formát (`body.geojson`)

Soubor je typu `FeatureCollection`. Každé město je jeden `Feature` typu `Point`
s těmito atributy:

| Atribut   | Typ    | Popis                    |
|-----------|--------|--------------------------|
| `id`      | číslo  | jedinečný identifikátor  |
| `nazev`   | text   | název města              |
| `popisek` | text   | krátký popis města       |

**Pozor na pořadí souřadnic:** v GeoJSONu je to `[délka, šířka]`
(tedy `[lon, lat]`), v Leafletu je to naopak.

### Přidání nového města

Přidejte do pole `features` další objekt:

```json
{
  "type": "Feature",
  "properties": {
    "id": 3,
    "nazev": "Brno",
    "popisek": "Druhé největší město České republiky."
  },
  "geometry": {
    "type": "Point",
    "coordinates": [16.6068, 49.1951]
  }
}
```

Mapa se přiblíží na všechny načtené body automaticky.

## Použité technologie

- Leaflet 1.9.4 (načítán z CDN unpkg)
- Podkladová mapa © přispěvatelé OpenStreetMap
