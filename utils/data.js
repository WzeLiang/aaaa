var cells=[];
var weekdayanddate=[];
var clen = 7;
var weekday=[];
var currentFirstDate;

var formatDate = function (date) {

  // var year = date.getFullYear() + '年';
  // var month = (date.getMonth() + 1) + '月';
  // var day = date.getDate() + '日';
  var year = date.getFullYear() + '';
  var month = (date.getMonth() + 1) + '';
  if(month<10){
   month="0"+month;
  };
  var day = date.getDate() + '';
  var datetime = date;
  var week = '(' + ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()] + ')';
  
  return {
    totaldate: year +"."+ month +"."+ day,
    daylist:day,
    datetime: year + "." + month + "." + day
  };
};
var addDate = function (date, n) {
  date.setDate(date.getDate() + n);
  return date;
};
var setDate = function (date) {

  var week = date.getDay() - 1;
  if(week<0){
    date = addDate(date, -6);
  }
  else{
    date = addDate(date, week * -1);
  }
  currentFirstDate = new Date(date);
  for (var i = 0; i < clen; i++) {
    
    date= i == 0 ? date : addDate(date, 1);
    cells[i] = formatDate(date).totaldate;
    weekday[i] = formatDate(date).daylist;
    var dateNew = new Date(date);
    var obj={};
    obj.day = weekday[i];
    obj.datetime = dateNew;
    weekdayanddate[i]=obj;
  }
};
 function pre() {

  setDate(addDate(currentFirstDate, -7));
};


function next() {

  setDate(addDate(currentFirstDate, 7));
};

//setDate(new Date());
module.exports.setDate = setDate;
module.exports.pre = pre;
module.exports.next = next;
module.exports.cells = cells;
module.exports.weekday = weekday;
module.exports.weekdayanddate = weekdayanddate;