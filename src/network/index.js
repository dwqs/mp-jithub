import { host } from '../../config/host';

function request (method, url, data) {
    return new Promise((resolve, reject) => {
        wx.request({
            method,
            url: `${host}${url}`,
            data,
            success (data) {
                resolve(data);
            },
    
            fail () {
                reject();
            }
        });
    });
}

export default {
    get (url, data = {}) {
        return request('GET', url, data);
    },

    post (url, data = {}) {
        return request('POST', url, data);
    }
};
