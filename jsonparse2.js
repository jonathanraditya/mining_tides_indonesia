const readDemnas=require('./example.json');

//calculate array length
const arrayLength=Object.keys(readDemnas.features).length;
console.log(arrayLength);

//breakdown json data
const definePath=readDemnas.features[50].properties.NAMOBJ;
console.log(definePath);

//example download path
const downloadPath=`http://tides.big.go.id/DEMNAS/download.php?download_file=DEMNAS_${definePath}_v1.0.tif`;
console.log(downloadPath);

//save file from url
const http = require('http');
const fs = require('fs');

//execute sample file download. Comment it.
// const file = fs.createWriteStream('download/file.jpg');
// const request=http.get('http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg', (response) => {response.pipe(file)});

//Create sleep javascript function
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

//loop through whole array to get downloadPath
//Make download function

async function saveDemnasFile(fileName, urlLink){
    //const res = await fetch(urlLink);
    const file = fs.createWriteStream(fileName);
    try{
        const request=await http.get(urlLink, (response) => {response.pipe(file)});
    }catch(err){
        console.log(err.message);
        await sleep(10000);
        //try again
        try{
            console.log('try again')
            const request=await http.get(urlLink, (response) => {response.pipe(file)});
        }catch(err){
            console.log('still error'+err.message);
        }
    }
    
    //console.log(request);
}

async function demnasDownloadPath(){
    var j=0;
    var k=0;
    for(i=3257; i<arrayLength; i++){
        const loopPath=readDemnas.features[i].properties.NAMOBJ;
        const loopDownloadPath=`http://tides.big.go.id/DEMNAS/download.php?download_file=DEMNAS_${loopPath}_v1.0.tif`;
        const fileNameExtract=`download/${i}_DEMNAS_${loopPath}_v1.0.tif`;
        console.log(loopDownloadPath);
        console.log(fileNameExtract);
        const executeDownload = await saveDemnasFile(fileNameExtract,loopDownloadPath);
        await sleep(20000);
        j++;
        if(j==20){
            await sleep(60000);
            j=0;
            k++;
            if(k==1){
                await sleep(120000);
                k=0;
            }
        }
    }
}

demnasDownloadPath();





