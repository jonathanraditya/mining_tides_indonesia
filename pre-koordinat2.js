let definedWdth = 130;
let definedHgt = 44; //total req = definedWdth x definedHgt
let startFrom = 5748;
let findMaxDivide = (nm, divider) => {
    return parseInt((nm - (nm % divider)) / divider , 10);
}
let iparamStartingPoint = findMaxDivide(startFrom , definedHgt); //default == any
let jparamStartingPoint = startFrom % definedHgt; //default == any
let batasTiap1KaliRun = 5 //jumlah request sebelum istirahat
let breakEveryRequest = 15000; //in miliseconds || default 16000
let takeABreak = 500; //in miliseconds || sleeping for [takeABreak]ms every [batasTiap1KaliRun] request
var titikKoordinatFetch = new Array();
var arrTitikPanjang = new Array();
var arrTitikLebar = new Array();
const curDate = "1602398717703"; //new Date().getTime()
const http = require("http");
const fs = require("fs");
const md5 = require("md5");
const {
    dir
} = require("console");

let sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let kiriBawahIndonesia = {
    lintang: {
        deg: 10,
        min: 59 / 60,
        det: 14.9 / 3600
    },
    bujur: {
        deg: 95,
        min: 00 / 60,
        det: 40.7 / 3600
    }
}

let kiriAtasIndonesia = {
    lintang: {
        deg: 5,
        min: 43 / 60,
        det: 26.4 / 3600
    },
    bujur: {
        deg: 95,
        min: 00 / 60,
        det: 40.7 / 3600
    }
}

let kananBawahIndonesia = {
    lintang: {
        deg: 10,
        min: 59 / 60,
        det: 14.9 / 3600
    },
    bujur: {
        deg: 141,
        min: 01 / 60,
        det: 09.5 / 3600
    }
}

let kananAtasIndonesia = {
    lintang: {
        deg: 5,
        min: 33 / 60,
        det: 41.3 / 3600
    },
    bujur: {
        deg: 141,
        min: 01 / 60,
        det: 09.5 / 3600
    }
}

let hasilKiriBawah = {
    lintang: kiriBawahIndonesia.lintang.deg +
        kiriBawahIndonesia.lintang.min +
        kiriBawahIndonesia.lintang.det,

    bujur: kiriBawahIndonesia.bujur.deg +
        kiriBawahIndonesia.bujur.min +
        kiriBawahIndonesia.bujur.det
}

let hasilKiriAtas = {
    lintang: kiriAtasIndonesia.lintang.deg +
        kiriAtasIndonesia.lintang.min +
        kiriAtasIndonesia.lintang.det,

    bujur: kiriAtasIndonesia.bujur.deg +
        kiriAtasIndonesia.bujur.min +
        kiriAtasIndonesia.bujur.det
}

let hasilKananAtas = {
    lintang: kananAtasIndonesia.lintang.deg +
        kananAtasIndonesia.lintang.min +
        kananAtasIndonesia.lintang.det,

    bujur: kananAtasIndonesia.bujur.deg +
        kananAtasIndonesia.bujur.min +
        kananAtasIndonesia.bujur.det
}

let hasilKananBawah = {
    lintang: kananBawahIndonesia.lintang.deg +
        kananBawahIndonesia.lintang.min +
        kananBawahIndonesia.lintang.det,

    bujur: kananBawahIndonesia.bujur.deg +
        kananBawahIndonesia.bujur.min +
        kananBawahIndonesia.bujur.det
}

let panjangIndonesia = hasilKananAtas.bujur - hasilKiriAtas.bujur;
let lebarIndonesia = hasilKananAtas.lintang - (-hasilKananBawah.lintang);
let pjgTiPjg = (panjangIndonesia / definedWdth) / panjangIndonesia; //panjang setiap titik ke titik dari hasil bagi panjang indonesia
let pjgTiLbr = (lebarIndonesia / definedHgt) / lebarIndonesia; //panjang setiap titik ke titik dari hasil bagi lebar indonesia  

let buatTitikPanjang = () => {

    //buat titik panjang
    let hasilTitikPjg = idx => (pjgTiPjg * idx) * panjangIndonesia; //hasil titik panjang dari indonesia dengan param idx
    for (let i = 0; i <= definedWdth; i++) {
        arrTitikPanjang[i] = hasilTitikPjg(i);
    }
    return arrTitikPanjang;

}

let buatTitikLebar = () => {

    //buat titik panjang
    let hasilTitikLbr = idx => (pjgTiLbr * idx) * lebarIndonesia; //hasil titik panjang dari indonesia dengan param idx
    for (let i = 0; i <= definedHgt; i++) {
        arrTitikLebar[i] = hasilTitikLbr(i);
    }
    return arrTitikLebar;

}

//console.log(buatTitikPanjang())
//console.log(buatTitikLebar())

const savePath1='titikPanjang.txt';
const savePath2='titikLebar.txt';

const writeStream1 = fs.createWriteStream(savePath1)
const writeStream2 = fs.createWriteStream(savePath2)

let result1=buatTitikPanjang()
let result2=buatTitikLebar()

result1.forEach(value => writeStream1.write(`'${value}'\n`))
result2.forEach(value => writeStream2.write(`'${value}'\n`))


//require('fs').writeFile(savePath1, buatTitikPanjang());
//require('fs').writeFile(savePath2, buatTitikLebar());





function readThenWrMd5(fPathRead, fPathWrite) { //read a file and then write its md5 to a file

    //read and then print the md5 hash
    fs.readFile(fPathRead, function (err, buf) {

        //write the md5 hash to a file
        fs.appendFile(fPathWrite, md5(buf), function (err) {
            if (err) throw err;
            console.log(`File ${fPathWrite} => created`);
        });
        console.log(`\n md5 of ${fPathRead} : ${md5(buf)} \n created in ${fPathWrite}`);
        return md5(buf).toString();

    });

}

async function compareMd5(fPath1, fPath2) {

    fs.readFile(fPath1, (err1, buf1) => {

        fs.readFile(fPath2, (err2, buf2) => {

            let file1Md5Str = buf1.toString(); // convert md 5 of file 1 to string
            let file2Md5Str = buf2.toString(); // convert md 5 of file 2 to string

            console.log(`\n COMPARING MD 5 OF : \n ${fPath1} and \n ${fPath2}\n`);

            if (md5(buf1).toString === md5(buf2).toString) {
                console.log(`md5 compared, RESULT => SAME , returning true...`);
                return true;
            } else {
                console.log(`md5 compared, RESULT => NOT SAME , returning false...`);
                return false;
            }

        });
    });

}

let genNumWithIndex = (idx1, idx2) => {
    return `test-${idx1}-${idx2}`
}

async function buatKoordinatTitik() {
    await buatTitikPanjang();
    await buatTitikLebar();

    for (let i = 0; i <= definedWdth; i++) {
        titikKoordinatFetch[i] = new Array();
        for (let j = 0; j <= definedHgt; j++) {
            titikKoordinatFetch[i][j] = new Array();
            titikKoordinatFetch[i][j][0] = arrTitikPanjang[i] + hasilKiriAtas.bujur;
            titikKoordinatFetch[i][j][1] = arrTitikLebar[j] + (-hasilKiriBawah.lintang);
            //console.log(arrTitikPanjang[i] + " dan " + arrTitikLebar[j])
        }
    }
    console.log(titikKoordinatFetch);
    return titikKoordinatFetch;
}

console.log(hasilKiriAtas.bujur)
console.log(-hasilKiriBawah.lintang)


async function requestToServHttp(lnk, theFile, fName, md5hash, thecb, callbackCompareMd5) {
    /*
    callbackCompareMd5 {
        option: true
        comparefn: function(){}
    }
    */
    const theReq = await http.get(
            lnk,
            async (res, err) => {
                //save the file
                await res.pipe(theFile);
                //read file and then write md5 to new file
                console.log(`========REQLINK=======\n ${thecb.reqlink} \n ===================`)
                if (thecb.reqlink == true || thecb.reqlink) {
                    await readThenWrMd5(fName, md5hash);
                }
                //call the callback param
                await thecb.caback();
                //compare md5 hash
                if (callbackCompareMd5.option == true && thecb.reqlink == true) {
                    callbackCompareMd5.comparefn();
                }
                //if error throw the error
                if (err) {
                    console.log(`\n Error : ${err} \n`);
                }
            }
        )
        .on('error', async(err) => {
            // Check if retry is needed
            if (err) {
                console.log(`\n===========================================\nERROR , RETRYING...\n===========================================\n`);
		await sleep(1000);
                requestToServHttp(lnk, theFile, fName, md5hash, thecb, callbackCompareMd5);
            }
        });
    return true;
}

async function checkAndCallbackMd5(md5hash1, md5hash2, thecb) {
    if (await compareMd5(md5hash1, md5hash2)) {
        thecb.compare.success();
    } else {
        thecb.compare.err();
    }
}


async function requesting(fName1, fName2, md5hash1, md5hash2, lnk, thecb) {

    /*fname => file name (write)
    md5hash => path to md5 hash file (write)
    lnk => link 
    thecb {
        caback: any,
        cabackExist: boolean,
        compare: {
            success: any,
            err: any
        }
    }*/

    const theFile1 = fs.createWriteStream(fName1);
    const theFile2 = fs.createWriteStream(fName2);
    const md5hashFile1 = fs.createWriteStream(md5hash1);
    const md5hashFile2 = fs.createWriteStream(md5hash2);

    const reqToServ1 = requestToServHttp(lnk, theFile1, fName1, md5hash1, thecb, {
        option: false
    });
    const reqToServ2 = requestToServHttp(lnk, theFile2, fName2, md5hash2, thecb, {
        option: true,
        comparefn: () => {
            if (reqToServ1 && reqToServ2) {
                console.log(`\n request finished, comparing md5...`);
                checkAndCallbackMd5(md5hash1, md5hash2, thecb)
            }
        }
    });

}

async function crDir(dirPth) { //create dr if it is not exists || dirPth => path to the directory
    if (!fs.existsSync(dirPth)) {
        await fs.mkdirSync(dirPth);
    }
}

async function callbackAndMore(iparam, jparam) {
    let cbReq = { //callback of the requesting fn()

        //callback
        caback: () => { //callback
            console.log(`http://tides.big.go.id/pasut/proses.php?lat=${titikKoordinatFetch[iparam][jparam][0]}&lon=${titikKoordinatFetch[iparam][jparam][1]}&tanggal1=10/01/2020&tanggal2=10/15/2020`);
            console.log(`function success, running callback...`);
            requesting(
                `./the-file/${curDate}/hasil/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][0]},${titikKoordinatFetch[iparam][jparam][1]}][hasil(1)-${curDate}].txt`,
                `./the-file/${curDate}/hasil/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][0]},${titikKoordinatFetch[iparam][jparam][1]}][hasil(2)-${curDate}].txt`,
                `./the-file/${curDate}/md5hash/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][0]},${titikKoordinatFetch[iparam][jparam][1]}][hasil-md5hash(1)-${curDate}].txt`,
                `./the-file/${curDate}/md5hash/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][1]},${titikKoordinatFetch[iparam][jparam][0]}][hasil-md5hash(2)-${curDate}].txt`,
                `http://tides.big.go.id/pasut/elevation.txt`, {
                    caback: () => {
                        console.log(`callback ${iparam} ${jparam} success`);
                    },
                    reqlink: true
                }
            );
        },

        reqlink: false, //request link to ~/elevation.txt

        //compare callback
        compare: {

            //if success
            success: () => {
                console.log(`\n md5 Compared, SUCCESS`);
            },

            //if error
            err: async () => {
                console.log(`\n md5 are not same, re-fetching txt file... `);
                await requesting(
                    `./the-file/${curDate}/req/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][0]},${titikKoordinatFetch[iparam][jparam][1]}][req(1)-${curDate}].txt`,
                    `./the-file/${curDate}/req/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][0]},${titikKoordinatFetch[iparam][jparam][1]}][req(2)-${curDate}].txt`,
                    `./the-file/${curDate}/req/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][0]},${titikKoordinatFetch[iparam][jparam][1]}][req-md5hash(1)-${curDate}].txt`,
                    `./the-file/${curDate}/req/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][0]},${titikKoordinatFetch[iparam][jparam][1]}][req-md5hash(2)-${curDate}].txt`,
                    `http://tides.big.go.id/pasut/proses.php?lat=${titikKoordinatFetch[iparam][jparam][1]}&lon=${titikKoordinatFetch[iparam][jparam][0]}&tanggal1=10/01/2020&tanggal2=10/15/2020`,
                    cbReq
                );
            }

        }

    }

    await requesting(
        `./the-file/${curDate}/req/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][0]},${titikKoordinatFetch[iparam][jparam][1]}][req(1)-${curDate}].txt`,
        `./the-file/${curDate}/req/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][0]},${titikKoordinatFetch[iparam][jparam][1]}][req(2)-${curDate}].txt`,
        `./the-file/${curDate}/req/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][0]},${titikKoordinatFetch[iparam][jparam][1]}][req-md5hash(1)-${curDate}].txt`,
        `./the-file/${curDate}/req/[${iparam}][${jparam}][${titikKoordinatFetch[iparam][jparam][0]},${titikKoordinatFetch[iparam][jparam][1]}][req-md5hash(2)-${curDate}].txt`,
        `http://tides.big.go.id/pasut/proses.php?lat=${titikKoordinatFetch[iparam][jparam][1]}&lon=${titikKoordinatFetch[iparam][jparam][0]}&tanggal1=10/01/2020&tanggal2=10/15/2020`,
        cbReq
    ); //request link
}

let curReqValue = (iparamCurrent, jparamCurrent) => {
    return (definedHgt * (iparamCurrent)) + jparamCurrent
}

//requesting to the link with fn
async function reqTheText() {

    await buatKoordinatTitik();

    let batasTiap1KaliRunIndex = 1;
    batasTiap1KaliRun += 1;

    await crDir(`./the-file/${curDate}`);
    await crDir(`./the-file/${curDate}/hasil`);
    await crDir(`./the-file/${curDate}/req`);
    await crDir(`./the-file/${curDate}/md5hash`);

    for (let iparam = iparamStartingPoint; iparam <= definedWdth; iparam++) {
        for (let jparam = jparamStartingPoint; jparam <= definedHgt; jparam++) {

            console.log(`CURRENT REQUEST = ${curReqValue(iparam,jparam)}`);
            console.log(`CURRENT ARRAY = [${iparam}][${jparam}]`);
            console.log(`CURRENT [i] = ${iparam}`);
            console.log(`CURRENT [j] = ${jparam} \n`);
            console.log(`[LOG]   [LOG]   [LOG]   [LOG] \n`);
            await callbackAndMore(iparam, jparam);
            await sleep(breakEveryRequest);
            console.log("\n\n===============================================\n\n");

            if (batasTiap1KaliRunIndex == batasTiap1KaliRun) {
                batasTiap1KaliRunIndex = 0;
                console.log("\n===============================================\n");
                console.log(`SLEEPING FOR ${takeABreak}ms (every ${batasTiap1KaliRun} request)`);
                console.log("\n===============================================\n");
                await sleep(takeABreak);
            }

            batasTiap1KaliRunIndex++;

        }
    }

}

//reqTheText();