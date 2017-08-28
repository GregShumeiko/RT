

var arrayListPhone4x = [];
var arrayListPhone5x = [];
var arrayListPhone6x = [];
var arrayListPhone7x = [];

var arrayListPad4x = [];
var arrayListPad5x = [];
var arrayListPad6x = [];
var arrayListPad7x = [];

var stringListPhone4x = "";
var stringListPhone5x = "";
var stringListPhone6x = "";
var stringListPhone7x = "";

var stringListPad4x = "";
var stringListPad5x = "";
var stringListPad6x = "";
var stringListPad7x = "";

var htmlListFirst = '<div class="form-row"><label><input class="checkbox" type="checkbox" idDevice="';
var htmlListFirst2 = '" value="';
var htmlListMiddle = '"><span class="checkbox-custom"></span><span class="label">';
var htmlListLast = '</span></label></div>';

var arrayPhoneNotUsedModern = [];
var arrayPhoneNotUsedClassic = [];
var arrayPadNotUsedModermTabletSettings = [];
var arrayPadNotUsedClassicPhoneSettings = [];
var arrayPadNotUsedModermPhoneSettings = [];
var arrayPadNotUsedClassicTabletSettings = [];

var arrayDeviceIsUsed = [];

window.onload = function () {
    $(document).ready(function () {
        $.getJSON("src/devices.json", function (arrayDevice) {

            //var arrayDevice = JSON.parse(deviceList);

            arrayDeviceIsUsed = arrayDevice;

            //распределение девайсов по группам (по версиям OS и не отстой) и сохранение в массивах
            for (var i = 0; i < arrayDevice.devices.length; i++) {
                if (arrayDevice.devices[i].platform == 'phone' & arrayDevice.devices[i].weakDevice != true) {
                    switch (arrayDevice.devices[i].osVersionShort) {
                        case '4':
                            arrayListPhone4x.push(arrayDevice.devices[i].id);
                            arrayListPhone4x.push(fullDeviceName());
                            break;
                        case '5':
                            arrayListPhone5x.push(arrayDevice.devices[i].id);
                            arrayListPhone5x.push(fullDeviceName());
                            break;
                        case '6':
                            arrayListPhone6x.push(arrayDevice.devices[i].id);
                            arrayListPhone6x.push(fullDeviceName());
                            break;
                        case '7':
                            arrayListPhone7x.push(arrayDevice.devices[i].id);
                            arrayListPhone7x.push(fullDeviceName());
                            break;
                        default:
                            console.log("что-то пошло не так с телефонами " + i);
                    }
                }
                if (arrayDevice.devices[i].platform == 'pad' & arrayDevice.devices[i].weakDevice != true) {
                    switch (arrayDevice.devices[i].osVersionShort) {
                        case '4':
                            arrayListPad4x.push(arrayDevice.devices[i].id);
                            arrayListPad4x.push(fullDeviceName());
                            break;
                        case '5':
                            arrayListPad5x.push(arrayDevice.devices[i].id);
                            arrayListPad5x.push(fullDeviceName());
                            break;
                        case '6':
                            arrayListPad6x.push(arrayDevice.devices[i].id);
                            arrayListPad6x.push(fullDeviceName());
                            break;
                        case '7':
                            arrayListPad7x.push(arrayDevice.devices[i].id);
                            arrayListPad7x.push(fullDeviceName());
                            break;
                        default:
                            console.log("что-то пошло не так с планшетами " + i);
                    }
                }

            }

            function fullDeviceName() {
                arrayFullDeviceName = arrayDevice.devices[i].factory + " " + arrayDevice.devices[i].model + " (" + arrayDevice.devices[i].osVersionFull + ")";
                return arrayFullDeviceName;
            }

            for (var i = 1; i < arrayListPhone4x.length; i += 2) {
                stringListPhone4x += htmlListFirst + arrayListPhone4x[i - 1] + htmlListFirst2 + arrayListPhone4x[i] + htmlListMiddle + arrayListPhone4x[i] + htmlListLast;
            }

            for (var i = 1; i < arrayListPhone5x.length; i += 2) {
                stringListPhone5x += htmlListFirst + arrayListPhone5x[i - 1] + htmlListFirst2 + arrayListPhone5x[i] + htmlListMiddle + arrayListPhone5x[i] + htmlListLast;
            }

            for (var i = 1; i < arrayListPhone6x.length; i += 2) {
                stringListPhone6x += htmlListFirst + arrayListPhone6x[i - 1] + htmlListFirst2 + arrayListPhone6x[i] + htmlListMiddle + arrayListPhone6x[i] + htmlListLast;
            }

            for (var i = 1; i < arrayListPhone7x.length; i += 2) {
                stringListPhone7x += htmlListFirst + arrayListPhone7x[i - 1] + htmlListFirst2 + arrayListPhone6x[i] + htmlListMiddle + arrayListPhone7x[i] + htmlListLast;
            }

            for (var i = 1; i < arrayListPad4x.length; i += 2) {
                stringListPad4x += htmlListFirst + arrayListPad4x[i - 1] + htmlListFirst2 + arrayListPad4x[i] + htmlListMiddle + arrayListPad4x[i] + htmlListLast;
            }

            for (var i = 1; i < arrayListPad5x.length; i += 2) {
                stringListPad5x += htmlListFirst + arrayListPad5x[i - 1] + htmlListFirst2 + arrayListPad5x[i] + htmlListMiddle + arrayListPad5x[i] + htmlListLast;
            }

            for (var i = 1; i < arrayListPad6x.length; i += 2) {
                stringListPad6x += htmlListFirst + arrayListPad6x[i - 1] + htmlListFirst2 + arrayListPad6x[i] + htmlListMiddle + arrayListPad6x[i] + htmlListLast;
            }
            for (var i = 1; i < arrayListPad7x.length; i += 2) {
                stringListPad7x += htmlListFirst + arrayListPad7x[i - 1] + htmlListFirst2 + arrayListPad7x[i] + htmlListMiddle + arrayListPad7x[i] + htmlListLast;
            }

            $(".listPhone4x").html(stringListPhone4x);
            $(".listPhone5x").html(stringListPhone5x);
            $(".listPhone6x").html(stringListPhone6x);
            $(".listPhone7x").html(stringListPhone7x);
            $(".listPad4x").html(stringListPad4x);
            $(".listPad5x").html(stringListPad5x);
            $(".listPad6x").html(stringListPad6x);
            $(".listPad7x").html(stringListPad7x);

            var boxes = $("input:checkbox");
            $("input:checkbox").on("change", function () {

                var deviceIsUsed = "";
                var theArray = new Array();
                for (var i = 0; i < boxes.length; i++) {
                    var box = boxes[i];
                    if ($(box).prop('checked')) {
                        theArray[theArray.length] = $(box).attr('idDevice');
                    }
                }

                if (theArray.length == 0) {
                    for (var i = 0; i < arrayDeviceIsUsed.devices.length; i++) {
                        arrayDeviceIsUsed.devices[i].isUsed = false;
                    }

                }
                else {
                    for (var i = 0; i < theArray.length; i++) {
                        arrayDeviceIsUsed.devices[theArray[i]].isUsed = true;
                    }

                }

            });

        });
    });
}


function arrayDeviceNotUsed() {

    for (var i = 0; i < arrayDeviceIsUsed.devices.length; i++) {
        if (arrayDeviceIsUsed.devices[i].platform == 'phone' & arrayDeviceIsUsed.devices[i].osVersionShort > 4 & arrayDeviceIsUsed.devices[i].weakDevice != true & arrayDeviceIsUsed.devices[i].isUsed != true) {
            arrayPhoneNotUsedModern.push(arrayDeviceIsUsed.devices[i].factory + " " + arrayDeviceIsUsed.devices[i].model + " (" + arrayDeviceIsUsed.devices[i].osVersionFull + ")");
        }
        if (arrayDeviceIsUsed.devices[i].platform == 'phone' & arrayDeviceIsUsed.devices[i].osVersionShort < 5 & arrayDeviceIsUsed.devices[i].weakDevice != true & arrayDeviceIsUsed.devices[i].isUsed != true) {
            arrayPhoneNotUsedClassic.push(arrayDeviceIsUsed.devices[i].factory + " " + arrayDeviceIsUsed.devices[i].model + " (" + arrayDeviceIsUsed.devices[i].osVersionFull + ")");
        }
        if (arrayDeviceIsUsed.devices[i].platform == 'pad' & arrayDeviceIsUsed.devices[i].deviceInfo.isSettingsTablet != false & arrayDeviceIsUsed.devices[i].osVersionShort > 4 & arrayDeviceIsUsed.devices[i].weakDevice != true & arrayDeviceIsUsed.devices[i].isUsed != true) {
            arrayPadNotUsedModermTabletSettings.push(arrayDeviceIsUsed.devices[i].factory + " " + arrayDeviceIsUsed.devices[i].model + " (" + arrayDeviceIsUsed.devices[i].osVersionFull + ")");
        }
        if (arrayDeviceIsUsed.devices[i].platform == 'pad' & arrayDeviceIsUsed.devices[i].deviceInfo.isSettingsTablet != true & arrayDeviceIsUsed.devices[i].osVersionShort < 5 & arrayDeviceIsUsed.devices[i].weakDevice != true & arrayDeviceIsUsed.devices[i].isUsed != true) {
            arrayPadNotUsedClassicPhoneSettings.push(arrayDeviceIsUsed.devices[i].factory + " " + arrayDeviceIsUsed.devices[i].model + " (" + arrayDeviceIsUsed.devices[i].osVersionFull + ")");
        }
        if (arrayDeviceIsUsed.devices[i].platform == 'pad' & arrayDeviceIsUsed.devices[i].deviceInfo.isSettingsTablet != true & arrayDeviceIsUsed.devices[i].osVersionShort > 4 & arrayDeviceIsUsed.devices[i].weakDevice != true & arrayDeviceIsUsed.devices[i].isUsed != true) {
            arrayPadNotUsedModermPhoneSettings.push(arrayDeviceIsUsed.devices[i].factory + " " + arrayDeviceIsUsed.devices[i].model + " (" + arrayDeviceIsUsed.devices[i].osVersionFull + ")");
        }
        if (arrayDeviceIsUsed.devices[i].platform == 'pad' & arrayDeviceIsUsed.devices[i].deviceInfo.isSettingsTablet != false & arrayDeviceIsUsed.devices[i].osVersionShort < 5 & arrayDeviceIsUsed.devices[i].weakDevice != true & arrayDeviceIsUsed.devices[i].isUsed != true) {
            arrayPadNotUsedClassicTabletSettings.push(arrayDeviceIsUsed.devices[i].factory + " " + arrayDeviceIsUsed.devices[i].model + " (" + arrayDeviceIsUsed.devices[i].osVersionFull + ")");
        }
    }
}

function compareRandom() {
    return Math.random() - 0.5;
}

function randomEverything() {

    arrayDeviceNotUsed();

    arrayPhoneNotUsedModern.sort(compareRandom);
    arrayPhoneNotUsedClassic.sort(compareRandom);
    arrayPadNotUsedModermTabletSettings.sort(compareRandom);
    arrayPadNotUsedClassicPhoneSettings.sort(compareRandom);
    arrayPadNotUsedModermPhoneSettings.sort(compareRandom);
    arrayPadNotUsedClassicTabletSettings.sort(compareRandom);

    var text_1 = text_2 = text_3 = "";

    if (arrayPhoneNotUsedModern.length < arrayPhoneNotUsedClassic.length) {
        for (var i = 0; i < arrayPhoneNotUsedModern.length; i++) {
            text_1 += arrayPhoneNotUsedModern[i] + " <br />";
            text_1 += arrayPhoneNotUsedClassic[i] + " <br />";
            text_1 += " <br />";
        }
    }
    else {
        for (var i = 0; i < arrayPhoneNotUsedClassic.length; i++) {
            text_1 += arrayPhoneNotUsedModern[i] + " <br />";
            text_1 += arrayPhoneNotUsedClassic[i] + " <br />";
            text_1 += " <br />";
        }
    }

    if (arrayPadNotUsedModermTabletSettings.length < arrayPadNotUsedClassicPhoneSettings.length) {
        for (var i = 0; i < arrayPadNotUsedModermTabletSettings.length; i++) {
            text_2 += arrayPadNotUsedModermTabletSettings[i] + " <br />";
            text_2 += arrayPadNotUsedClassicPhoneSettings[i] + " <br />";
            text_2 += " <br />";
        }
    }
    else {
        for (var i = 0; i < arrayPadNotUsedClassicPhoneSettings.length; i++) {
            text_2 += arrayPadNotUsedModermTabletSettings[i] + " <br />";
            text_2 += arrayPadNotUsedClassicPhoneSettings[i] + " <br />";
            text_2 += " <br />";
        }
    }

    if (arrayPadNotUsedModermPhoneSettings.length < arrayPadNotUsedClassicTabletSettings.length) {
        for (var i = 0; i < arrayPadNotUsedModermPhoneSettings.length; i++) {
            text_3 += arrayPadNotUsedModermPhoneSettings[i] + " <br />";
            text_3 += arrayPadNotUsedClassicTabletSettings[i] + " <br />";
            text_3 += " <br />";
        }
    }
    else {
        for (var i = 0; i < arrayPadNotUsedClassicTabletSettings.length; i++) {
            text_3 += arrayPadNotUsedModermPhoneSettings[i] + " <br />";
            text_3 += arrayPadNotUsedClassicTabletSettings[i] + " <br />";
            text_3 += " <br />";
        }
    }

    $(".ApadLargeNewAndSmallOld").html(text_1);
    $(".ApadSmallNewAndLargeOld").html(text_2);
    $(".AphoneNewOld").html(text_3);

    arrayPhoneNotUsedModern = [];
    arrayPhoneNotUsedClassic = [];
    arrayPadNotUsedModermTabletSettings = [];
    arrayPadNotUsedClassicPhoneSettings = [];
    arrayPadNotUsedModermPhoneSettings = [];
    arrayPadNotUsedClassicTabletSettings = [];

}

function clearCheckbox() {
    location.reload();
}