
import store from "../store";
export const formatNum = (data) => {
    return Number(data).toFixed(2);
}

export const formatNum3 = (data) => {
    if(JSON.stringify(data).indexOf('.') != -1){
        return Number(data).toFixed(3);
    }
    return Number(data);
}
export const formatNum4 = (data) => {
    return Number(data).toFixed(4);
}
//时间戳转换成日期时间(年月日)
function js_date_time(unixtime) {
    var dateTime = new Date(parseInt(unixtime) * 1000)
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    if (month > 0 && month < 10) {
        month = "0" + month;
    }
    var day = dateTime.getDate();
    if (day > 0 && day < 10) {
        day = "0" + day;
    }
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(now.toDateString());  //typescript转换写法
    var milliseconds = now_new - dateTime;
    var timeSpanStr = year + '-' + month + '-' + day;
    return timeSpanStr;
}
export const timeToYMD = (data) => {
    return js_date_time(data);
}

function js_date_time_second(time) {
    var date = new Date(time * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    var timeStr = y + '-' + m + '-' + d + '　' + h + ':' + minute + ':' + second;
    return timeStr;
}
export const timeToYMDHMS = (data) => {
    return js_date_time_second(data);
}

function date_time(time) {
    var date = new Date(time * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    var timeStr = m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    return timeStr;
}
export const timeToMDHM = (data) => {
    return date_time(data);
}
export const cunt18NUm = (data) => {
    return parseInt(data / 1000000000000000000);
}
export const chengPer = (data) => {
    return Number(data * 100);
}
// 数字 逢三一断,过滤器
export const numFilterThreeCut = (value) => {
    if (!value) return '0.00'
    if (value == '-') {
        return value;
    }
    var saveFort = '';
    value = (typeof value != 'string') ? JSON.stringify(value) : value;
    if (value.indexOf('.') != -1) {
        saveFort = value.split('.')[1];
    }
    value = Number(value).toFixed(2);
    var intPart = Math.trunc(value)// 获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    if (saveFort) {
        return intPartFormat + '.' + saveFort
    }
    return intPartFormat;
}
function thousandsFun(num){
    var str = num.toString();
    var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg,"$1,");
  }
function formatAmount(amount, thound = true) {
    if (amount == null) return 0.00;
    var value = Number.parseFloat(amount).toFixed() / Number.parseFloat('1e+18');
    if (thound)
        return thousandsFun(value.toFixed(2));
    else
        return value;
}
export const formatAmountNum = (value) => {
    return formatAmount(value);
}
export const thousands = (value) => {
    return thousandsFun(value);
}

function formatAddress(address, link = true, whole = false, cp = false, onlyicon = false, ishref = false) {
    let title = '';
    if (Array.isArray(address)) {
        title = address[1];
        address = address[0];
    }
    if (address && address.trim().length == 0) return '';
    if (title.length == 0) {
        if (whole) {
            title = address;
        }
        else {
            title = address.substr(0, 6) + '....' + address.substr(address.length - 4, address.length)
        }
    }
    if (onlyicon) title = '';
    return title;
}
export const normalAddress = (value) => {
    if(!value){
        return "--";
    }
    return formatAddress(value)
}