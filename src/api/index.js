import {
    get,
    post
} from '@/axios/http.js'

function getIndex(params) {
    return get('/mock/5cb48c7ed491cd741c54456f/base/index', params)
}
// 自动注册

// 轮播图
function banner(params) {
    return get('/videosite/ad/get/banner/' + params)
}
// 首页公告
function notice(params) {
    return get('/videosite/notice/get/' + params)
}

// 今日推荐
function ByTodayPlaySum(params) {
    return post('/videosite/video/get/getByTodayPlaySum/0', params)
}

// 获取频标签和对应的视频简略信息
function LabelAndVideos(params) {
    return post('/videosite/video/get/getLabelAndVideos', params)
}

// 获取频标签和对应的视频简略信息
function AllVideoType(params) {
    return post('/videosite/video/get/getAllVideoType', params)
}


//  视频标签
function videolabel() {
    return get('/videosite/video-label/get/all')
}

// 视频数据
function findbylabel(params) {
    return post('/videosite/video/get/find-by-label', params)
}

// 留言板数据
function feedbackList(params) {
    return post('/videosite/user-feedback/web/list', params)
}

// 留言板评论
function addfeedback(params) {
    return post('/videosite/user-feedback/web/add', params)
}


// 获取剧集详细信息
function InfoByCodeNum(params) {
    return post('/videosite/video/get/getInfoByCodeNum', params)
}

// 获取验证码

function sendCode(params) {
    return post('/videosite/user/send-code/' + params)
}

// 手机号登录

function loginByPhone(params) {
    return post('/videosite/user/loginByPhone', params)
}
// 视频播放
function playinfo(params) {
    return post('/videosite/video/get/play-info', params)
}
// vip视频播放

function vipplayinfo(params) {
    return post('/videosite/video/get/vip-play-info', params)
}


// 点击广告
function adclick(params) {
    return post('/videosite/ad/click', params)
}



// 获取当前用户信息

function userinfo(params) {
    return post('/videosite/user/user-info', params)
}

function updateUser(nickname, gender, userIcon, profile) {
    return post('/videosite/user/update', {
        nickname,
        gender,
        userIcon,
        profile
    })
}

// 查询收藏列表

function usercollelist(params) {
    return post('/videosite/user-video-collection/list', params)
}

// 搜索
function search(params) {
    return post('/videosite/video/get/search', params)
}

// 排行榜
function VideoByPlaySum(params) {
    return post('/videosite/video/get/getVideoByPlaySum', params)
}

// 相关视频
function relevant(params) {
    return post('/videosite/video/get/relevant', params)
}
// 收藏视频
function addCollection(params) {
    return get('/videosite/user-video-collection/add/' + params)
}

// 取消收藏
function removeCollection(params) {
    return get('/videosite/user-video-collection/remove/' + params)
}

// 获取任务列表

function tasklist(params) {
    return post('/videosite/task/list', params)
}

// 推广信息
function spreadinfo() {
    return get('/videosite/user/spread-info')
}
// 签到
function tasksign(params) {
    return post('/videosite/task/sign', params)
}

// 兑换观影次数
function changeMb(params) {
    return post('/videosite/user/changeMb/'+params)
}

// // 点击广告
// function tasksign(params) {
//     return post('/videosite/task/sign',params)
// }


export {
    getIndex,
    LabelAndVideos,
    banner,
    notice,
    ByTodayPlaySum,
    AllVideoType,
    videolabel,
    findbylabel,
    feedbackList,
    addfeedback,
    InfoByCodeNum,
    sendCode,
    loginByPhone,
    playinfo,
    vipplayinfo,
    userinfo,
    updateUser,
    usercollelist,
    search,
    VideoByPlaySum,
    relevant,
    addCollection,
    removeCollection,
    tasklist,
    spreadinfo,
    tasksign,
    adclick,
    changeMb
}
