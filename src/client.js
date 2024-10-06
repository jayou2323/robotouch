import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'http://13.124.167.232:8080',
//   withCredentials: false, // 쿠키를 포함하지 않는 경우 false로 설정
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   }
});

export default apiClient;