// const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
// Venue date opponent result runs balls fours sixes sr
const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const xlsx=require("xlsx");
// home page 
function startactivity(url){
    request(url, cb);
}

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractdata(html);
    }
}
function extractdata(html) {
    let $=cheerio.load(html);
    let descElem=$(".ds-text-tight-m.ds-font-regular.ds-text-typo-mid3");
    let matchresult=$(".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo");
    let s2=matchresult.text().split("won");
    let winteamname=s2[0].trim();
    let s1=descElem.text().split(",");
    let venue=s1[1].trim();//trim removes front and end white spaces
    let date=s1[2].trim();
    console.log(venue);
    console.log(date);
// -----------------------------------------------------------------
    let twotables=$(".ds-rounded-lg.ds-mt-2");
    for(let i=0;i<twotables.length;i++)
    {
        let teamname=$(twotables[i]).find(".ds-text-title-xs.ds-font-bold.ds-capitalize").text();
        let opponentidx=Math.abs(1-i);
        let opponentteamname=$(twotables[opponentidx]).find(".ds-text-title-xs.ds-font-bold.ds-capitalize").text();
        console.log(teamname);
        console.log(opponentteamname);
        let k=0;
        let allrows=$(twotables[i]).find(".ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table tbody tr");
        for(let j=0;j<allrows.length-3;j++){
            if(!$(allrows[j]).hasClass("ds-hidden") && !$(allrows[j]).hasClass("!ds-border-b-0") && !$(allrows[j]).hasClass("ds-text-tight-s") ){
                // console.log(k);
                // k++;
                let allcols=$(allrows[j]).find("td");
                // console.log(allcols.text())
                let playername=$(allcols[0]).text().trim();
                let runs=$(allcols[2]).text().trim();
                let balls=$(allcols[3]).text().trim();
                let fours=$(allcols[5]).text().trim();
                let sixes=$(allcols[6]).text().trim();
                let SR=$(allcols[7]).text().trim();
                console.log(`${playername} ${runs} ${balls} ${fours} ${sixes}`);
                processPlayer(teamname,playername,opponentteamname,venue,runs,balls,fours,sixes,SR);
            }

        }
        
    }
    console.log("------------------");
}
function processPlayer(teamname,playername,opponentteamname,venue,runs,balls,fours,sixes,SR)
{
    let teampath=path.join(__dirname,"ipl",teamname);   
    dirCreater(teampath);
    let filePath=path.join(teampath,playername+".xlsx");    
    let content=excelReader(filePath,playername);     
    let playerobj={
        teamname,
        playername,
        opponentteamname,
        venue,
        runs,
        balls,
        fours,
        sixes,
        SR
    }
    content.push(playerobj);
    excelWriter(filePath,content,playername);  
}

function dirCreater(filePath) {
    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }

}
function excelWriter(filePath, json, sheetName) {
    let newWB = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    xlsx.writeFile(newWB, filePath);
}
// // json data -> excel format convert
// // -> newwb , ws , sheet name
// // filePath
// read 
//  workbook get
function excelReader(filePath, sheetName) {
    if (fs.existsSync(filePath) == false) {
        return [];
    }
    let wb = xlsx.readFile(filePath);
    let excelData = wb.Sheets[sheetName];
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}

module.exports={
    fun1:startactivity
}


