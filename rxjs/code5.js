const axios = require('axios');
const { from } = require('rxjs');

const request = axios.create({
  baseURL: 'https://wxtestapplet.gac-nio.com',
  timeout: 30000,
  headers: {
    'Authorization': 'Basic YXBwLWNsaWVudDphcHBjbGllbnRzZWNyZXQhMTIz',
    'Content-Type': 'application/json;charset=UTF-8',
    'device-id': '066A1D4E-8338-4879-9F77-8110340D924C',
    'version': '1.0.0'
  },
});
//这里演示登录的例子

let getToken$ = (phone) => {
  return request.request({
    method: 'POST',
    url: '/auth/mobile/token',
    params: {
      mobile: phone,
      code: '6666',
      'grant-type': 'mobile',
      scope: 'server',
      userSource: 7
    }
  })
} 

from(getToken$('13180808080')).subscribe({
  next: rep => {
    console.log(rep.data)
  },
  error: err => {
    console.log(err)
  }
})

// 无答案