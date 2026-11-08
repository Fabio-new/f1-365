
const J="https://api.jolpi.ca/ergast/f1/2026/";
const O="https://api.openf1.org/v1/";
async function get(url){const r=await fetch(url,{headers:{"user-agent":"F1-365/9"}}); if(!r.ok) throw new Error(r.status); return r.json()}
export default async function handler(req,res){
  try{
    const q=req.query.q||"calendar";
    let data;
    if(q==="calendar"){data=await get(J); return res.status(200).setHeader("Cache-Control","s-maxage=300, stale-while-revalidate=600").json({season:"2026",races:data.MRData?.RaceTable?.Races||[]});}
    if(q==="results"){const data=await get(J+"results/1.json?limit=100"); const races=data.MRData?.RaceTable?.Races||[]; return res.status(200).setHeader("Cache-Control","s-maxage=300, stale-while-revalidate=600").json({races});}
    if(q==="standings/drivers"){const data=await get(J+"driverstandings.json?limit=100"); const s=data.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings||[]; return res.status(200).setHeader("Cache-Control","s-maxage=300, stale-while-revalidate=600").json({standings:s});}
    if(q==="standings/constructors"){const data=await get(J+"constructorstandings.json?limit=100"); const s=data.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings||[]; return res.status(200).setHeader("Cache-Control","s-maxage=300, stale-while-revalidate=600").json({standings:s});}
    if(q==="drivers"){const data=await get(J+"drivers.json?limit=100"); return res.status(200).setHeader("Cache-Control","s-maxage=1800, stale-while-revalidate=3600").json({drivers:data.MRData?.DriverTable?.Drivers||[]});}
    if(q==="teams"){const data=await get(J+"constructors.json?limit=100"); return res.status(200).setHeader("Cache-Control","s-maxage=1800, stale-while-revalidate=3600").json({teams:data.MRData?.ConstructorTable?.Constructors||[]});}
    if(q==="news"){
      const sources=[["Formula 1","https://www.formula1.com/en/latest"],["FIA","https://www.fia.com/news"]];
      const out=[];
      for(const [source,url] of sources){try{const html=await (await fetch(url,{headers:{"user-agent":"F1-365/9"}})).text(); for(const m of html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)){const title=m[2].replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim(); if(title.length>35 && /(F1|Formula 1|Grand Prix|GP|FIA|driver|team|qualif|race|championship|champion)/i.test(title)){let u=m[1]; if(u.startsWith("/")) u=new URL(u,url).href; if(/^https?:/.test(u)) out.push({title,source,url:u,published:""});}}}catch{}}
      const uniq=[...new Map(out.map(x=>[x.url,x])).values()].slice(0,24);
      return res.status(200).setHeader("Cache-Control","s-maxage=900, stale-while-revalidate=1800").json({news:uniq,verifiedSources:sources.map(x=>x[0])});
    }
    if(q==="live"){
      const sessions=await get(O+"sessions?session_key=latest");
      const s=Array.isArray(sessions)?sessions[0]:null;
      return res.status(200).setHeader("Cache-Control","s-maxage=30, stale-while-revalidate=120").json({session:s});
    }
    return res.status(400).json({error:"query non supportata"});
  }catch(e){return res.status(502).json({error:"Dati esterni temporaneamente non disponibili",detail:String(e)})}
}
