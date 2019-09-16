import React, { Component } from 'react'

import { connect } from 'react-redux';

class mapItem extends Component {
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div id="container" style={{ width: '100%', height: '100%' }}></div>
            </div>
        )
    }

    componentDidMount() {
        var map = new window.AMap.Map("container", {
            resizeEnable: true,
            center: [116.397428, 39.90923],
            zoom: 18
        });
        //获取用户所在城市信息

        //实例化城市查询类
        var citysearch = new window.AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                    //地图显示当前城市
                    map.setBounds(citybounds);
                    map.setZoom(11);
                }
            } else {
            }
        });

    }
}

export default connect()(mapItem)