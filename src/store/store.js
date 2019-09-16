import { createStore, combineReducers } from 'redux'

// 测试功能
function test(state = 'test', action) {
    switch (action.type) {
        default:
            return state
    }
}

// 管理历史记录
function historyArr(state = [], action) {
    switch (action.type) {
        case 'addHistory':
            return [action.obj, ...state.filter(obj => obj !== action.obj)]

        default:
            return state
    }
}


// 传递定位经纬度
function position(state = {}, action) {
    console.log(action)
    switch (action.type) {
        case 'position':
            return action.obj

        default:
            return state
    }
}







export default createStore(combineReducers({
    test, historyArr, position
}))