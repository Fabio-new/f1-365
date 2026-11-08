# F1 365 — V10 Home

Questa cartella contiene la nuova homepage di F1 365 ricostruita sulla base dello screenshot fornito.

## Cosa sostituire nel repository
Sostituisci:
- `index.html`
- `style.css`
- `app.js`
- `api/news.js`
- `api/f1.js`

Non eliminare le altre pagine V9 (`news.html`, `calendar.html`, `results.html`, `standings.html`, `drivers.html`, `teams.html`, `live.html`).

## Dati dinamici
- Calendario e classifiche: Jolpica F1 / API compatibile Ergast.
- News: Formula1.com e FIA.
- Il countdown del prossimo GP si aggiorna ogni secondo.
- La homepage sceglie automaticamente il prossimo evento futuro dal calendario.
- Le news sono linkate alla fonte originale.

## Pubblicazione
Carica i file nel repository GitHub `f1-365`. Se Vercel è collegato al repository, il deploy viene aggiornato automaticamente.

## Nota
La sezione news considera verificata la provenienza della notizia da una fonte primaria approvata; non equivale a una verifica indipendente multi-fonte del contenuto.
