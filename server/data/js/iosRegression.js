
var tableOpen = '<div class="divTable">';
var tableClose = '</div>';
var tableBodyOpen = '<div class="divTableBody">';
var tableBodyClose = '</div>';
var rowOpen = '<div class="divTableRow">';
var rowClose = '</div>';
var cellOpen = '<div class="divTableCell">';
var cellClose = '</div>';

var tableArray = [];
var tableHeaderArray = [];
var tableRawArray = [];
var testersInRegressionArray = [];
var testersInRegressionSortArray = [];
var text_1 = "";
var testersInRegressionArray = [];
var estimateTestersInRegression = []

window.onload = function () {
    $(document).ready(function () {
        $.getJSON("src/regressionTable.json", function (jsonToArray) {

            //записываем в переменную данные json файла
            tableArray = jsonToArray;
            //вызываем функцию для получения шапки таблицы
            getHeaderTable();
            //вызываем функцию для получения строк таблицы
            getRawTable();
            //вызываем функцию для построяения таблицы
            generateTable();
            //вызываем функцию для сбора участников регрессии
            testersInRegression();
            //вызываем функцию для рассчета сколько каждый тестер сделал в регрессии
            calculateEstimate();

            // Load the Visualization API and the corechart package.
            google.charts.load('current', { 'packages': ['corechart'] });
            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(drawChart);

        });
    });
}

//Функция для построяения таблицы
function generateTable() {

    text_1 += tableOpen;

    text_1 += rowOpen;

    for (var i = 0; i < tableHeaderArray.length; i++) {

        text_1 += cellOpen + tableHeaderArray[i] + cellClose;

    }

    text_1 += rowClose;

    for (var i = 0; i < tableRawArray.length; i++) {

        text_1 += rowOpen;

        for (var j = 0; j < tableRawArray[i].length; j++) {
            text_1 += cellOpen + tableRawArray[i][j] + cellClose;
        }

        text_1 += rowClose;

    }

    text_1 += tableClose;

    $(".smallTable").html(text_1);

}

//Функция для получения шапки таблицы
function getHeaderTable() {
    for (var i = 0; i < tableArray.data.structure.fields.length; i++) {

        tableHeaderArray.push(tableArray.data.structure.fields[i].title);

    }

    //console.log(tableHeaderArray);

}

//Функция для получения строк таблицы
function getRawTable() {

    //for (var i = 0; i < tableArray.data.rows.length; i++) {
    for (var i = 0; i < 50; i++) {

        var rowArray = tableArray.data.rows[i];

        tableRawArray[i] = [];

        for (var j = 0; j < rowArray.length; j++) {
            tableRawArray[i][j] = rowArray[j].sort;
        }

    }

    //console.log(tableRawArray);

}

//Функция для сбора участников регрессии
function testersInRegression() {

    var RegexVar;

    for (var i = 0; i < tableRawArray.length; i++) {

        RegexVar = tableRawArray[i][2].match(/[А-Яа-я]*/i);
        testersInRegressionArray.push(RegexVar);
        RegexVar = tableRawArray[i][6].match(/[А-Яа-я]*/i);
        testersInRegressionArray.push(RegexVar);

    }

    for (var i = 2; i < testersInRegressionArray.length; i++) {
        if (typeof testersInRegressionArray[i][0] !== undefined && testersInRegressionArray[i][0] !== null && testersInRegressionArray[i][0] !== "") {
            testersInRegressionSortArray.push(testersInRegressionArray[i][0]);
        }
    }

    var newArray = testersInRegressionSortArray.filter(function (elem, pos) {
        return testersInRegressionSortArray.indexOf(elem) == pos;
    });

    testersInRegressionSortArray = newArray;

    //console.log(testersInRegressionSortArray);

}

//Функция для рассчета сколько каждый тестер сделал в регрессии
function calculateEstimate() {

    var testArrayName = [];
    var testArrayTime = [];

    //Фильтрация по регулярному выражению тестером и таймингов
    // [i][6] - по 7 столбцу - тестировщик на aPad
    // [i][7] - по 8 столбцу - тайминги на aPad
    for (var i = 2; i < tableRawArray.length; i++) {
        RegexVar = tableRawArray[i][6].match(/[А-Яа-я]*/ig);
        testArrayName.push(RegexVar);
        RegexVar = tableRawArray[i][7].match(/[0-9]*/ig);
        testArrayTime.push(RegexVar);
    }

    var testArraySortTestersName = [];
    var testArraySortTestersTime = [];

    // После фильтрации участников в регресии убираем лишние пустые строки
    // алгоритм должен вернуть массив с участиками регресии
    for (var i = 0; i < testArrayName.length; i++) {
        var k = 0;
        testArraySortTestersName[i] = [];
        for (var j = 0; j < testArrayName[i].length; j++) {
            if (typeof testArrayName[i][j] !== undefined && testArrayName[i][j] !== null && testArrayName[i][j] !== "") {
                testArraySortTestersName[i][k] = testArrayName[i][j];
                k++;
            }
        }
    }

    // После фильтрации таймингов в регресии убираем лишние пустые строки и преоразуем в числовой тип
    // алгоритм должен вернуть массив с данными по эстимейтам
    for (var i = 0; i < testArrayTime.length; i++) {
        var k = 0;
        testArraySortTestersTime[i] = [];
        for (var j = 0; j < testArrayTime[i].length; j++) {
            if (typeof testArrayTime[i][j] !== undefined && testArrayTime[i][j] !== null && testArrayTime[i][j] !== "") {
                testArraySortTestersTime[i][k] = parseInt(testArrayTime[i][j]);
                k++;
            }
        }
    }

    // Собираем данные по кажому тестировщику, сколько времени затрачено в регресии
    
    for (var i = 0; i < testersInRegressionSortArray.length; i++) {

        estimateTestersInRegression[i] = [];
        estimateTestersInRegression[i][0] = testersInRegressionSortArray[i];
        estimateTestersInRegression[i][1] = 0;

        for (var j = 0; j < testArraySortTestersName.length; j++) {
            for (var k = 0; k < testArraySortTestersName[j].length; k++) {
                if (testArraySortTestersName[j][k] == testersInRegressionSortArray[i]) {
                    estimateTestersInRegression[i][1] += testArraySortTestersTime[j][k];
                }
            }

        }

    }

    console.log(estimateTestersInRegression);

}

function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows(estimateTestersInRegression);

    // Set chart options
    var options = {
        'title': 'Участие в регресии',
        'width': 700,
        'height': 600,
        'pieHole': 0.4
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}