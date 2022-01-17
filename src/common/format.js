import store from "../store";
//格式化时间
function formatYMD(ymd) {
    return ymd < 10 ? ('0' + ymd) : ymd;
}

function formatDate(time, type) {
    var dt = new Date(time)
    var month = formatYMD(dt.getMonth() + 1)
    var day = formatYMD(dt.getDate())
    var hh = formatYMD(dt.getHours())
    var mm = formatYMD(dt.getMinutes())
    var ss = formatYMD(dt.getSeconds())
    switch (type) {
        case 1:
            return time = dt.getFullYear();
        case 2:
            return time = dt.getFullYear() + '-' + month;
        case 3:
            return time = dt.getFullYear() + '-' + month + '-' + day;
        case 4:
            return time = dt.getFullYear() + '-' + month + '-' + day + " " + hh + ":" + mm;
        default:
            return time = dt.getFullYear() + '-' + month + '-' + day + " " + hh + ":" + mm + ":" + ss;
    }
}
function thousands(num) {
    var str = num.toString();
    var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, "$1,");
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
function IntNumFilterThreeCut(value) {
    if (!value) return '0'
    value = Number(value).toFixed(2);
    var intPart = Math.trunc(value)// 获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    return intPartFormat;
}

function getUTCTime(timestamp) {
    timestamp = parseInt(timestamp);
    if (timestamp > 0) {
        return (new Date(timestamp * 1000)).Format("MM-dd hh:mm:ss");
    }
    return '';
}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function getEpochDateSorate(epoch) {
    let date = new Date(1587600005000)
    date.setDate(date.getDate() + parseInt(epoch) - 1);
    return formatDate(date, '');
}
function getEpochDate(epoch, flg = '') {
    //let date = new Date('April-23-2020 12:00:05 AM +8 UTC') //Block Height: 1
    let date = new Date(1587600005000)
    date.setDate(date.getDate() + parseInt(epoch) - 1);
    let epoch_date = date.toUTCString();
    if (flg == 'dm') {
        return epoch_date.substr(5, 6);
    }
    else if (flg == 'dmy') {
        return epoch_date.substr(5, 11);
    }
    else {
        return epoch_date;
    }
}
function chartTipTitle(epoch, epoch_date = '') {
    if (epoch_date.length == 0) {
        epoch_date = getEpochDate(epoch)
    }
    var tip = rankStr(epoch) + ' Epoch&nbsp;&nbsp;&nbsp;&nbsp;' + epoch_date.substr(5, 11);
    return tip
}
function rankStr(num) {
    if (parseInt(num) == 1)
        return '1st';
    else if (parseInt(num) == 2)
        return '2nd';
    else if (parseInt(num) == 3)
        return '3rd';
    else
        return num + 'Th';
}
function get_lan(m) {
    if (!window.lans) return m;
    if (!window.lans[lan]) return m;
    if (!window.lans[lan][m]) return m;
    return lans[lan][m];
}
function timeSpan(timesData, prestr = get_lan('Updated'), endstr = '!') {
    var dateBegin = new Date(timesData);
    var dateEnd = new Date();
    var dateDiff = dateEnd.getTime() - dateBegin.getTime();
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
    var leave1 = dateDiff % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));
    var leave2 = leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));
    var leave3 = leave2 % (60 * 1000);
    var seconds = Math.round(leave3 / 1000);
    var timesString = prestr;
    if (dayDiff != 0) {
        timesString += dayDiff + ' days ago';
    } else if (dayDiff == 0 && hours != 0) {
        timesString += hours + ' hours ago';
    } else if (dayDiff == 0 && hours == 0) {
        timesString += minutes + ' minutes ago';
    }
    timesString += endstr;
    return timesString;
}
function roundFun(value, decimals) {
    if (!value) {
        value = 0
    }
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
function thousandsFun(num) {
    var str = num.toString();
    var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, "$1,");
}
function formatAmount(amount, thound = true) {
    if (amount == null) return 0.00;
    var value = Number.parseFloat(amount).toFixed() / Number.parseFloat('1e+18');
    if (thound)
        return thousandsFun(value.toFixed(2));
    else
        return value;
}
function formatDateShen(timestamp, year = true, month = true, day = true, hour = true, minute = true, second = true) {
    let date = new Date(timestamp);
    let Y = date.getFullYear();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    let D = date.getDate();
    D = D < 10 ? '0' + D : D;
    let h = date.getHours();
    h = h < 10 ? '0' + h : h;
    let m = date.getMinutes();
    m = m < 10 ? '0' + m : m;
    let s = date.getSeconds();
    s = s < 10 ? '0' + s : s;
    return [Y, M, D, h, m, s];
}

export default {
    formatYMD,
    formatDate,
    thousands,
    formatAddress,
    getEpochDate,
    getUTCTime,
    chartTipTitle,
    rankStr,
    get_lan,
    timeSpan,
    IntNumFilterThreeCut,
    getEpochDateSorate,
    roundFun, formatAmount,
    formatDateShen
}
