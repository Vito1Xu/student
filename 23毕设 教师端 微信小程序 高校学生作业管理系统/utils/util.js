const formatTime = date => { //=>箭头函数 function 接住参数date
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
//定义 变量或函数 来暴露（vue 导出）模块并使用 
module.exports = {
  formatTime:formatTime    //一般为对象    属性:属性值
}
