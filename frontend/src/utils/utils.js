const { NODE_ENV } = process.env
const BASE_URL = (NODE_ENV === 'production' ? 'https://api.renat1987.nomoredomains.xyz' : 'http://localhost:3001');
// const BASE_URL = 'http://localhost:4000';
export default BASE_URL;