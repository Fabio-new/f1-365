# F1 365 — Pacchetto pronto per la pubblicazione

## Cosa contiene
- Sito multipagina responsive in HTML/CSS
- 10 pagine principali: Home, News, Calendario, Risultati, Classifiche, Piloti, Team, Circuiti, Video, F1 Live
- favicon e Web App Manifest
- SEO base: title, description, Open Graph, robots.txt, sitemap.xml
- pagina 404
- menu mobile
- file di configurazione compatibili con hosting statici
- asset grafico del brand in `assets/`

## Pubblicazione rapida

### Netlify
1. Vai su Netlify e crea un nuovo sito.
2. Trascina la cartella `f1-365-pubblicazione` nell'area di deploy oppure carica lo ZIP.
3. Associa il dominio personalizzato.

### Vercel
1. Importa il progetto come sito statico.
2. Usa la root del progetto e nessun build command.
3. Pubblica.

### GitHub Pages
1. Carica i file in un repository.
2. Vai in Settings → Pages.
3. Seleziona il branch principale e la cartella root.
4. Salva e collega il dominio.

## Prima del lancio
I dati presenti nelle pagine sono ancora dimostrativi. Prima di usare F1 365 come portale editoriale reale, collega:
- calendario e sessioni a una fonte dati affidabile;
- risultati e classifiche a dati aggiornati;
- feed/news a un CMS o workflow editoriale;
- F1 Live a una sorgente live autorizzata;
- analytics, Search Console e gestione cookie/privacy secondo il tuo paese.

Dominio previsto nel sitemap: `www.f1365.it`. Se utilizzi un altro dominio, sostituiscilo in `sitemap.xml`.
