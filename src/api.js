import axios from 'axios';

// api calls to login and get statements of the account
export default {
    user: {
        login: credentials =>
            axios.post("/api/auth", { credentials }).then(res => res.data.user)
    }
}