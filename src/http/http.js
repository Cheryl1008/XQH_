// get
export function httpGet(url){
  var result = fetch(url);
  return result;
}

// post  {a:a}
export function httpPost(url,params){
  var result = fetch(url,{
    method:"post",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // 参数格式是form-data格式
    body:stringify(params)
  })

  return result;
}


function stringify(obj){
  var result = ""; // 接受最后的结果  {name:iwen,age:20}
  var item;
  for(item in obj){ // &user_id=iwen&age=20&sex=nan
    result += "&"+item+"="+encodeURIComponent(obj[item]);
  }
  if(result){
    result = result.slice(1) // user_id=iwen&age=20&sex=nan
  }
  return result;
}
