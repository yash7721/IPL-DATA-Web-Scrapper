const url = "https://www.espncricinfo.com/series/indian-premier-league-2007-08-313494";
// Venue date opponent result runs balls fours sixes sr
const request = require("request");
const fs=require("fs");
const cheerio = require("cheerio");
const scoreCardObj=require("./Scorecard");
const path=require("path");
const xlsx=require("xlsx");
const iplpath=path.join(__dirname,"ipl");
// home page 
dirCreator(iplpath);
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractLink(html);
    }
}
function extractLink(html) {
    let $ = cheerio.load(html);
    let anchorElem = $(".ds-border-t.ds-border-line.ds-text-center.ds-py-2 a");
    let link = anchorElem.attr("href");
    // console.log(link);
    let fullLink = "https://www.espncricinfo.com" + link;
    console.log(fullLink);
    getAllMatchesLink(fullLink);
}

function getAllMatchesLink(url)
{
    request(url, function (err, response, html) {
        if (err) {
            console.log(err);
        }
        else {
            extractAllLinks(html);
        }
    })
}
function extractAllLinks(html) {
    let $ = cheerio.load(html);
    let scorecardElems = $(".ds-w-full.ds-bg-fill-content-prime.ds-overflow-hidden.ds-rounded-xl.ds-border.ds-border-line .ds-p-0 .ds-p-4.hover\\:ds-bg-ui-fill-translucent.ds-border-t.ds-border-line");
    // console.log($(scorecardElems[0]).text());
    // console.log($(`${scorecardElems[0]}`).text);
    for (let i = 0; i < scorecardElems.length; i++) 
    {
        let linkdiv = $(scorecardElems[i]).find(".ds-grow.ds-px-4.ds-border-r.ds-border-line-default-translucent a");
        let link=$(linkdiv).attr("href");
        let fullLink = "https://www.espncricinfo.com" + link;
        console.log(fullLink);
        scoreCardObj.fun1(fullLink);
    }
}
function dirCreator(filepath){
    if(fs.existsSync(filepath)==false){
        fs.mkdir(filepath, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
    }
}