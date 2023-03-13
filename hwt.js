const request= require("request");
const cheerio =require("cheerio");
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
request(url,cb);
function cb(err,response,data){
    if(err)
    {
        console.log("error");
    }
    else
    {
        extractHTML(data);
        // console.log(data);
    }
}
function extractHTML(data)
{
    let $= cheerio.load(data);
    // let elmsarray=$('.ds-text-compact-xxs .ds-text-tight-m span');
    let elmsarray2=$('.ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo');
    // console.log(elmsarray);

    // let text=$(elmsarray[0]).text();
    let winteam=$(elmsarray2[0]).text();
    // console.log(elmsarray2);
    // let htmldata=$(elmsarray[0]).html();
    // console.log("text data",text);
    // console.log(winteam);
    winteam = winteam.split(" ");
    for(let i=0;i<winteam.length;i++){
        if(winteam[i]=="won")
        {
            winteamname=winteam[i-1];
            break;
        }
    }
    // console.log("html data",htmldata);

    let htmldata="";
    let inningsdata=$(".ds-rounded-lg.ds-mt-2");
    // console.log(inningsdata.length);
    let hwt="";
    let hwtname="";
    for(let i=0;i<inningsdata.length;i++)
    {
        // let chtml=$(inningsdata[i]).html();
        // htmldata+=chtml;
        let teamNameEle=$(inningsdata[i]).find(".ds-text-title-xs.ds-font-bold.ds-capitalize");
        let teamname=teamNameEle.text();
        teamname = teamname.split(" ");
        let teamnamelast=teamname[teamname.length-1];
        // console.log(teamnamelast);
        if(winteamname!=teamnamelast)
        {
            console.log(winteamname);
            console.log("is the winning team");
            let bowldata=$(inningsdata[i]).find(".ds-w-full.ds-table.ds-table-md.ds-table-auto").not('.ci-scorecard-table');
            let tabledata=$(bowldata).find("tr");
            // console.log(tabledata.length);
            for(let i=0;i<tabledata.length;i++){
                if(i==0 || i==4)continue;
                let allcolsOfPlayers=$(tabledata[i]).find("td");
                let playername=$(allcolsOfPlayers[0]).text();
                let wicketstaken=$(allcolsOfPlayers[4]).text();
                if(hwt<wicketstaken){
                    hwt=wicketstaken;
                    hwtname=playername;
                }
                // console.log(`playername is ${playername} and wicket taken is ${wicketstaken}`);
                
                // console.log(playername);
                // console.log(wicketstaken);
            }
            console.log(`Highest Wicket taker is ${hwtname} with ${hwt} wickets`);


        }
    }
    // console.log($(inningsdata[0]).text());
    // console.log(htmldata);
}