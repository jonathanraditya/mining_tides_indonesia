// let kiriBawahIndonesia = {
//     lintang: {
//         deg: 10,
//         min: 59,
//         det: 14.9
//     },
//     bujur: {
//         deg: 95,
//         min: 00,
//         det: 40.7
//     }
// }

// let kiriAtasIndonesia = {
//     lintang: {
//         deg: 5,
//         min: 43/60,
//         det: 26.4/3600
//     },
//     bujur: {
//         deg: 95,
//         min: 00/60,
//         det: 40.7/3600
//     }
// }

// let kananBawahIndonesia = {
//     lintang: {
//         deg: 10,
//         min: 59,
//         det: 14.9
//     },
//     bujur: {
//         deg: 141,
//         min: 01,
//         det: 09.5
//     }
// }

// let kananAtasIndonesia = {
//     lintang: {
//         deg: 5,
//         min: 33,
//         det: 41.3
//     },
//     bujur: {
//         deg: 141,
//         min: 01,
//         det: 09.5
//     }
// }

let definedWdth = 189;
let definedHgt = 81;

let kiriBawahIndonesia = {
    lintang: {
        deg: 10,
        min: 59/60,
        det: 14.9/3600
    },
    bujur: {
        deg: 95,
        min: 00/60,
        det: 40.7/3600
    }
}

let kiriAtasIndonesia = {
    lintang: {
        deg: 5,
        min: 43/60,
        det: 26.4/3600
    },
    bujur: {
        deg: 95,
        min: 00/60,
        det: 40.7/3600
    }
}

let kananBawahIndonesia = {
    lintang: {
        deg: 10,
        min: 59/60,
        det: 14.9/3600
    },
    bujur: {
        deg: 141,
        min: 01/60,
        det: 09.5/3600
    }
}

let kananAtasIndonesia = {
    lintang: {
        deg: 5,
        min: 33/60,
        det: 41.3/3600
    },
    bujur: {
        deg: 141,
        min: 01/60,
        det: 09.5/3600
    }
}

let hasilKiriBawah = {
    lintang: 
    kiriBawahIndonesia.lintang.deg + 
    kiriBawahIndonesia.lintang.min + 
    kiriBawahIndonesia.lintang.det,

    bujur:
    kiriBawahIndonesia.bujur.deg + 
    kiriBawahIndonesia.bujur.min + 
    kiriBawahIndonesia.bujur.det
}

let hasilKiriAtas = {
    lintang: 
    kiriAtasIndonesia.lintang.deg + 
    kiriAtasIndonesia.lintang.min + 
    kiriAtasIndonesia.lintang.det,

    bujur:
    kiriAtasIndonesia.bujur.deg + 
    kiriAtasIndonesia.bujur.min + 
    kiriAtasIndonesia.bujur.det
}

let hasilKananAtas = {
    lintang: 
    kananAtasIndonesia.lintang.deg + 
    kananAtasIndonesia.lintang.min + 
    kananAtasIndonesia.lintang.det,

    bujur:
    kananAtasIndonesia.bujur.deg + 
    kananAtasIndonesia.bujur.min + 
    kananAtasIndonesia.bujur.det
}

let hasilKananBawah = {
    lintang: 
    kananBawahIndonesia.lintang.deg + 
    kananBawahIndonesia.lintang.min + 
    kananBawahIndonesia.lintang.det,

    bujur:
    kananBawahIndonesia.bujur.deg + 
    kananBawahIndonesia.bujur.min + 
    kananBawahIndonesia.bujur.det
}

let panjangIndonesia = hasilKananAtas.bujur - hasilKiriAtas.bujur;
let lebarIndonesia = hasilKananAtas.lintang -(-hasilKananBawah.lintang);

let arrTitikPanjang;
let arrTitikLebar;

//buat titik panjang
for(let i=0; i<definedWdth; i++){
    console.log(
        (((panjangIndonesia/definedWdth)/panjangIndonesia)*i)*panjangIndonesia
    );
}


// console.log(hasilKananBawah);
// console.log(hasilKananAtas);
// console.log(hasilKiriAtas);
// console.log(hasilKiriBawah);

