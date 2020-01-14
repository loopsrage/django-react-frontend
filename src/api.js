import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFToken"

const token = Cookies.get('apv1');

let headers = {'content-Type': 'application/json'}

if (token){
    headers['Authorization'] = 'Token '+ token 
}

console.log(headers, token)

export default axios.create({
	baseURL: 'http://localhost:533/api/v1/',
    headers,
    withCredentials: true
})
