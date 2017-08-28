var time = [
    ["100", "30"],
    ["70"],
    ["120"],
    ["100"],
    ["90"],
    ["20"],
    ["60, 40"],
    ["20"],
    ["30"],
    ["80"],
    ["30"],
    ["15"],
    ["25"],
    ["35"],
    ["25"],
    ["15"],
    ["15"],
    ["20"],
    ["70"]
];

var peopleInReg = [
    ["Гриша", "Кира"],
    ["Кира"],
    ["Кира"],
    ["Кира"],
    ["Гриша"],
    ["Кира"],
    ["Гриша"],
    ["Кира"],
    ["Кира"],
    ["Стася"],
    ["Гриша"],
    ["Кира"],
    ["Кира"],
    ["Гриша"],
    ["Гриша"],
    ["Кира"],
    ["Кира"],
    ["Кира"],
    ["Гриша"]
];

var peopleReg = ["Кира", "Гриша", "Лена", "Стася"];

stringToInt();

/*console.log(peopleInReg.length);
console.log(peopleInReg[0].length);
console.log(time.length);*/

/*
function calcD(a, b, c) {
   return b*b - 4*a*c;
}

var test = calcD(-4, 2, 1);
alert(test); // 20
*/

var peopleTime = timengsByPeopleInRegression(peopleReg, time, peopleInReg);

function timengsByPeopleInRegression(peopleRegFunc, timeFunc, peopleInRegFunc){

    var peopleTimeFunc = [];

    for (var i = 0; i < peopleRegFunc.length; i++) {
        peopleTimeFunc[i] = [];
        peopleTimeFunc[i][0] = peopleRegFunc[i];
        peopleTimeFunc[i][1] = 0;
        for (var j = 0; j < peopleInRegFunc.length; j++) {
            for (var k = 0; k < peopleInRegFunc[j].length; k++) {
                if (peopleInRegFunc[j][k] == peopleRegFunc[i]) {
                    peopleTimeFunc[i][1] += timeFunc[j][k];
                }
            }
        }
    }

    return peopleTimeFunc;

}

//console.log(peopleTime);

console.log(peopleTime[0][0] + " " + peopleTime[0][1]);
console.log(peopleTime[1][0] + " " + peopleTime[1][1]);
console.log(peopleTime[2][0] + " " + peopleTime[2][1]);
console.log(peopleTime[3][0] + " " + peopleTime[3][1]);

function stringToInt() {
    for (var i = 0; i < time.length; i++) {
        for (var j = 0; j < time[i].length; j++) {
            time[i][j] = parseInt(time[i][j]);
        }
    }
}