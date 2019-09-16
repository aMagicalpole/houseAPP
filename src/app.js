import React, { Component } from 'react'
// 引入路由
import { HashRouter, Switch, Route } from 'react-router-dom'

// 引入redux仓库
import store from './store/store'
import { Provider } from 'react-redux'

// 引入路由页面
import Login from './pages/Login/Login' //登录
import Reg from './pages/Reg/Reg'  //注册
import Nav from './pages/Nav/Nav'  //导航
import Error404 from './pages/Error404/Error404' //非法地址跳转页面

import SelectCity from './pages/selectCity/SelectCity' //选择城市
import MapItem from './pages/mapItem/MapItem' //选择城市
import Search from './pages/search/Search'


export default class app extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path="/" exact component={Nav} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/reg" exact component={Reg} />
                        <Route path="/selectCity" exact component={SelectCity} />
                        <Route path="/mapItem" exact render={(props) => <MapItem {...props} />} />
                        <Route path="/search" exact component={Search} />

                        <Route component={Error404} />>
                </Switch>
                </HashRouter>
            </Provider>
        )
    }

}
