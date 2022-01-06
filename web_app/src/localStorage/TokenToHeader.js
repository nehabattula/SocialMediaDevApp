import axios from 'axios';

const TokenToHeader = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default TokenToHeader;