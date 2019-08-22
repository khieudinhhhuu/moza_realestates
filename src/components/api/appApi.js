import {formatBeforePost, prepareForAPI} from "../../cores/viewComponents/baseFunctions/BaseFunctions";
import constants from "../../assets/constants";

async function getSettings(token_login, key) {
    let url = constants.BASE_URL + constants.API_SETTINGS + `?key=${key}`;
    url = await prepareForAPI(url);
    console.log('getSettings ' + JSON.stringify(url));
    return fetch(url).then(res => res.json())
}

async function getCommentList(login_token, object_id, object_type, content) {
    let url = constants.BASE_URL +
        constants.API_SYSTEM_COMMENT + `?login_token=${login_token}&object_id=${object_id}&type=comment&object_type=${object_type}&content=${content}`;
    console.log('getCommentList: ' + url);
    return fetch(url).then(res => res.json())
}

async function getCommentAPI(object_type, object_id, login_token) {
    let url = constants.BASE_URL +
        constants.API_SYSTEM_COMMENT_LIST + `?object_type=${object_type}&object_id=${object_id}&login_token=${login_token}`;
    console.log('get comment api: ' + url);
    return fetch(url).then(res => res.json())
}

async function getBook(page) {
    const url = constants.BASE_URL_1 + constants.API_CONTENT + `?filter_by=book&page_limit=${page}`;
    console.log('get books: ' + url);
    return fetch(url)
        .then((response) => response.json());
}

const getMusic = (page) => {
    const url = constants.BASE_URL_1 + constants.API_CONTENT + `?filter_by=music&page_limit=${page}`;
    console.log('get music: ' + url);
    return fetch(url)
        .then((response) => response.json());
};

const getMovie = (page) => {
    const url = constants.BASE_URL_1 + constants.API_CONTENT + `?filter_by=movie&page_limit=${page}`;
    console.log('get movie: ' + url);
    return fetch(url)
        .then((response) => response.json());
};

const getCourse = (page) => {
    const url = constants.BASE_URL_1 + constants.API_CONTENT + `?filter_by=course&page_limit=${page}`;
    console.log('get course: ' + url);
    return fetch(url)
        .then((response) => response.json());
};

const getAlls = (page) => {
    const url = 'http://demo.mozasolution.com/moza-econtent/backend/web/index.php/content/api/item';
    console.log('get all content: ' + url);
    return fetch(url)
        .then((response) => response.json());
};

async function getBanner(page_limit) {
    const url = constants.BASE_URL + constants.API_BANNER + `?page_limit=${page_limit}`;
    try {
        let response = await fetch(url);
        console.log('get banner: ' + url);
        return await response.json();
    } catch (error) {
        // console.error('Error is: ' + error);
    }
}

async function getBlogs() {
    const url = constants.BASE_URL + constants.API_CMS_BLOGS;
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        // console.error('Error is: ' + error);
    }
}

async function getCategory(page_limit) {
    const url = constants.BASE_URL + constants.API_CATEGORY + `?page_limit=${page_limit}`;
    try {
        let response = await fetch(url);
        console.log('get category: ' + url);
        return await response.json();
    } catch (error) {
        // console.error('Error is: ' + error);
    }
}

async function getAuthor(page_limit) {
    const url = constants.BASE_URL + constants.API_AUTHOR + `?page_limit=${page_limit}`;
    try {
        let response = await fetch(url);
        console.log('get author: ' + url);
        return await response.json();
    } catch (error) {
        // console.error('Error is: ' + error);
    }
}

async function getGenre(page_limit) {
    const url = constants.BASE_URL + constants.API_GENRE + `?page_limit=${page_limit}`;
    try {
        let response = await fetch(url);
        console.log('get genre: ' + url);
        return await response.json();
    } catch (error) {
        // console.error('Error is: ' + error);
    }
}

async function getGroup(page_limit) {
    const url = constants.BASE_URL + constants.API_GROUP + `?page_limit=${page_limit}`;
    try {
        let response = await fetch(url);
        console.log('get group: ' + url);
        return await response.json();
    } catch (error) {
        // console.error('Error is: ' + error);
    }
}

async function getMood(page_limit) {
    const url = constants.BASE_URL + constants.API_MOOD + `?page_limit=${page_limit}`;
    try {
        let response = await fetch(url);
        console.log('get mood: ' + url);
        return await response.json();
    } catch (error) {
        // console.error('Error is: ' + error);
    }
}

async function getListContent(page_limit) {
    const url = constants.BASE_URL + constants.API_CONTENT + `?page_limit=${page_limit}`;
    try {
        let response = await fetch(url);
        console.log('get list content: ' + url);
        return await response.json();
    } catch (error) {
        // console.error('Error is: ' + error);
    }
}

async function getContentItem(page_limit) {
    const url = constants.BASE_URL_1 + constants.API_ITEM + `?page_limit=${page_limit}`;
    try {
        let response = await fetch(url);
        console.log('get content item: ' + url);
        return await response.json();
    } catch (error) {
        // console.error('Error is: ' + error);
    }
}

async function createOrder(action, type, order_data, guest_id) {
    try {
        const url = constants.BASE_URL + constants.API_ORDER;
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({action, type, order_data, guest_id})
        });
        console.log('create order: ' + url);
        return await response.json();
    } catch (error) {
        // console.error(`Error is : ${error}`);
    }
}

async function getDashBoard(page_limit) {
    const url = constants.BASE_URL + constants.API_DASH_BOARD + `?page_limit=${page_limit}`;
    try {
        let response = await fetch(url);
        console.log('get dashboard: ' + url);
        return await response.json();
    } catch (error) {
        // console.error('Error is: ' + error);
    }
}

async function onSignIn(allParams) {
    let url = constants.BASE_URL_1 +
        constants.API_LOGIN + `?username=${allParams.username}&password=${allParams.password}`;
    console.log('onSignIn: ' + url);
    //Mục đích sử dụng allParams là để truyền tất cả state sử dụng trong màn giao diện
    //ra và khi cần truyền lên tham số gì sẽ tự gọi tham số đấy ra vừa dễ debug trong console
    //log vừa đỡ phải nhớ tên tham số
    console.log(allParams);
    return fetch(url).then(res => res.json())
}

async function register(allParams) {
    try {
        // url = constants.BASE_URL + constants.API_REGISTER;
        let url = constants.BASE_URL_1 + constants.API_REGISTER +
            `?username=${allParams.username}&password=${allParams.password}&name=${allParams.rePassword}`;
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({allParams})
        });
        console.log('register: ' + url);
        return await response.json();
    } catch (error) {
        // console.log('Error is: ' + error)
    }
}

async function onloginByUsername(username, password, login_type) {
    try {
        const url = constants.BASE_URL +
            constants.API_LOGIN + `?username=${username}&password=${password}&login_type=${login_type}`;
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        // console.log('Error is: ' + error)
    }
}

async function updateProfile(allParams) {
    let url = constants.BASE_URL + constants.API_UPDATE_PROFILE;
    try {
        let formdata = new FormData();
        formdata.append('login_token', formatBeforePost(allParams.login_token));
        formdata.append('avatar', formatBeforePost(allParams.avatar));
        formdata.append('name', formatBeforePost(allParams.name));
        // formdata.append('phone', formatBeforePost(allParams.phone));
        // formdata.append('gender', formatBeforePost(allParams.gender));
        // formdata.append('dob', formatBeforePost(allParams.dob));
        // formdata.append('description', formatBeforePost(allParams.description));

        // formdata.append('Facebook', facebook)
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
        });
        console.log(allParams);
        return await response.json();
    } catch (error) {
        // console.log('Error is: ' + error)
    }
}

async function forgetPassword(email) {
    const url = constants.BASE_URL + constants.API_FORGET_PASSWORD + `?email=${email}`;
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        // console.log('Error is: ' + error)
    }
}

async function changePassword(allParams) {
    const url = constants.BASE_URL + constants.API_CHANGE_PASSWORD +
        `?login_token=${allParams.login_token}&current_password=${allParams.current_password}&new_password=${allParams.new_password}`;
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({allParams})
        });
        return await response.json();
    } catch (error) {
        // console.log('Error is: ' + error)
    }
}

async function getDevice(allParams) {
    try {
        const url = constants.BASE_URL_1 + constants.API_DEVICE +
            `?imei=${allParams.imei}&token=${allParams.token}`;
        let response = await fetch(url);
        console.log('get device: ' + url);
        return await response.json();
    } catch (error) {
        // console.error(`Error is : ${error}`);
    }
}

async function charge(allParams) {
    try {
        const url = constants.BASE_URL_1 + constants.API_CHARGE +
            `?login_token=${allParams.login_token}&amount=${allParams.amount}&transaction_id=${allParams.transaction_id}`;
        let response = await fetch(url);
        console.log('get charge: ' + url);
        return await response.json();
    } catch (error) {
        // console.error(`Error is : ${error}`);
    }
}

async function transaction(login_token) {
    try {
        const url = constants.BASE_URL_1 + constants.API_TRANSACTION + `?login_token=${login_token}`;
        let response = await fetch(url);
        console.log('get transaction: ' + url);
        return await response.json();
    } catch (error) {
        // console.error(`Error is : ${error}`);
    }
}

async function getProfile(login_token) {
    try {
        const url = constants.BASE_URL_1 + constants.API_PROFILE +
            `?login_token=${login_token}`;
        let response = await fetch(url);
        console.log('get profile: ' + url);
        return await response.json();
    } catch (error) {
        // console.error(`Error is : ${error}`);
    }
}

async function logout(login_token) {
    try {
        const url = constants.BASE_URL_1 + constants.API_LOGOUT +
            `?login_token=${login_token}`;
        let response = await fetch(url);
        let responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        // console.error(`Error is : ${error}`);
    }
}

export {getDevice};
export {charge};
export {changePassword};
export {forgetPassword};
export {onloginByUsername};
export {createOrder};
export {getBlogs};
export {getListContent};
export {getGenre};
export {transaction};
export {getMood};
export {updateProfile}
export {getProfile};
export {logout};
export {register};
export {onSignIn};
export {getBanner};
export {getCategory};
export {getAuthor};
export {getDashBoard};
export {getContentItem};
export {getBook};
export {getMusic};
export {getMovie};
export {getGroup};
export {getCourse};
export {getSettings};
export {getCommentList};
export {getCommentAPI};