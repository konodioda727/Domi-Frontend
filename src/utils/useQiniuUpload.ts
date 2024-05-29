import Taro from "@tarojs/taro";
import {fetch} from "@/services/fetch";

const uploadToQiniu = async (filePath) => {
    let token
    await fetch({
        url: '/tube/access_token',
        method: 'GET'
    }).then(e => token = e.data.data.access_token)
    return new Promise((resolve, reject) => {
        Taro.uploadFile({
            url: 'https://up-z2.qiniup.com',
            filePath: filePath,
            name: 'file',
            formData: {
                token: token
            },
            success(res) {
                resolve(res.data);
            },
            fail(err) {
                reject(err);
            }
        });
    });
};

export default uploadToQiniu;
