import jwt_decode from "jwt-decode";
import axios from "axios";
import {getFingerprint} from "./fingerprintUtils";

export async function getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken != null) {
        const expTime = jwt_decode(accessToken).exp;
        if (expTime * 1000 > new Date().getTime()) {
            return accessToken;
        }
    }
    const refreshToken = getRefreshToken();
    if (refreshToken) {
        await axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/base/refresh`, {refreshToken: refreshToken}, {
            headers: {
                fingerprint: await getFingerprint()
            }
        })
            .then((response) => {
                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                return accessToken;
            })
            .catch((err) => {
                // Refresh token is expired
                //logout()
                console.log(err.response.data);
            })
    } else {
        //logout()
    }
}

export function getRefreshToken() {
    return localStorage.getItem('refreshToken')
}

// TODO logout
const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}
