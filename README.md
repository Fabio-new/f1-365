# F1 365 — Versione 6
Dashboard Formula 1 pronta per GitHub + Vercel.

## Incluso
- Homepage dashboard
- News automatiche da fonti primarie approvate (Formula1.com e FIA)
- Badge VERIFICATA basato sulla provenienza da fonte primaria
- API serverless `/api/news`
- API dati `/api/data`
- Calendario
- Classifiche
- Piloti
- Team
- Risultati
- F1 Live predisposto
- SEO base e responsive design

## Deploy su Vercel
1. Crea un repository GitHub.
2. Carica il contenuto di questa cartella.
3. In Vercel scegli Add New > Project.
4. Importa il repository.
5. Lascia vuoti Build Command e Output Directory.
6. Premi Deploy.

## Nota dati
La parte news legge titoli e link dalle fonti primarie approvate e usa un fallback se una fonte non è disponibile. Il badge VERIFICATA indica la provenienza da una fonte primaria, non una verifica giornalistica incrociata tra più fonti.
Per una versione produzione completa conviene sostituire i fallback di `/api/data` con un provider dati F1 stabile e documentato.
