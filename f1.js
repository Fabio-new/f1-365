export default async function handler(req,res){
  const season=req.query.season||'2026';
  const base='https://api.jolpi.ca/ergast/f1/'+season;
  try{
    const [schedule,drivers,constructors]=await Promise.all([
      fetch(base+'.json').then(r=>r.json()),
      fetch(base+'/driverstandings.json').then(r=>r.json()),
      fetch(base+'/constructorstandings.json').then(r=>r.json())
    ]);
    const races=schedule.MRData?.RaceTable?.Races||[];
    const ds=drivers.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings||[];
    const cs=constructors.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings||[];
    res.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=600');
    res.status(200).json({
      season,
      calendar:races.map(r=>({round:r.round,name:r.raceName,city:r.Circuit?.Location?.locality,country:r.Circuit?.Location?.country,date:r.date,time:r.time||'00:00:00Z',circuit:r.Circuit?.circuitName})),
      drivers:ds,
      constructors:cs
    });
  }catch(e){res.status(502).json({error:'F1 data unavailable'})}
}
