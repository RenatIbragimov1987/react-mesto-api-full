const { REACT_APP_NODE_ENV } = process.env
const BASE_URL = (REACT_APP_NODE_ENV === 'production') ? 'https://api.renat1987.nomoredomains.xyz' : 'http://localhost:3001';
export default BASE_URL;