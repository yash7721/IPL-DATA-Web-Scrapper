// const request = require("request") ;  // to aquire request function
// const cheerio = require("cheerio") ;  // to handle html data quired from request

// console.log("Before") ;

// request('https://www.worldometers.info/coronavirus/', cb)
// function cb( error , response , body){
//     if(error){
//         console.log(error) ;
//     }else{
//         handleHTML(body) ;
//     }
// }
    
// function handleHTML(html){
//     let selTool = cheerio.load(html) ;
//     // sice we will not be able to use the html directly so we load this data in this variable
//     // console.log(selTool) ;
//     let contentArr = selTool('.maincounter-number span')  ;
//     // sel tool search for particular class and then by specific tags 
//     for(let i = 0  ; i<contentArr.length  ; i++){
//         let data = selTool(contentArr[i]).text() ; // it has text function 
//         console.log(data)
//     }
// }
// console.log("Before") ;
















const request= require("request");
const cheerio =require("cheerio");
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
request(url,cb);
function cb(err,response,data)
{
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
    let elmsarray=$('.ds-ml-4 .first-letter\\:ds-capitalize');

    // console.log(elmsarray);

    let text=$(elmsarray[0]).text();
    let htmldata=$(elmsarray[0]).html();
    console.log("text data",text);
    console.log("html data",htmldata);
}