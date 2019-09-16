import React, { Component } from 'react'

import { Flex, List } from 'antd-mobile'

const Item = List.Item;

export default class Mine extends Component {

    constructor() {
        super()
        this.state = {
            personInfo: '登录/注册',
            menu: [
                { id: 0 },
                { icon: 'icon17.png', name: '我的积分' },
                { icon: 'icon18.png', name: '我的订阅' },
                { icon: 'icon19.png', name: '微聊联系人' },
                { id: 1 },
                { icon: 'icon20.png', name: '房贷计算器' },
                { icon: 'icon21.png', name: '我的房子' },
                { id: 2 },
                { icon: 'icon22.png', name: '我的看房记录' },
                { icon: 'icon23.png', name: '我的问答' },
                { id: 3 },
                { icon: 'icon24.png', name: '设置' },
                { icon: 'icon25.png', name: '意见反馈' }
            ]
        }
    }

    render() {
        return (
            <div>
                {/* 头部 */}
                <div className='headers' style={{ backgroundColor: '#4DC8FC', padding: '20px' }}>
                    <Flex justify='between'>
                        {/* 头像 */}
                        <img src={require('../../../assets/images/head.png')} alt='headIcon' style={{ width: '60px' }}></img>
                        <div style={{ width: '70%', paddingLeft: '20px', color: '#fff' }}>
                            <p onClick={() => {
                                if (!localStorage.getItem('username')) this.props.h.push('/login')
                            }}>{this.state.personInfo}</p>
                            <div>可以与经纪人发起聊天</div>
                        </div>
                        <div style={{ width: '40px', textAlign: 'right' }}>
                            <img alt="menu" style={{ width: '20px' }} src={require('../../../assets/images/setting.png')}></img>
                        </div>
                    </Flex>
                </div>

                {/* 菜单 */}
                <List>
                    {
                        this.state.menu.map(obj => {
                            if (obj.name) {
                                return <Item
                                    thumb={require('../../../assets/images/' + obj.icon)}
                                    arrow="horizontal"
                                    onClick={() => { }}
                                    key={obj.name}
                                >{obj.name}</Item>
                            } else {
                                return <div key={obj.id} style={{ height: '10px', backgroundColor: '#f8f8f9' }}></div>
                            }

                        })
                    }
                </List>


            </div>
        )
    }

    componentDidMount() {
        // 根据登录状态修改用户名显示
        var localStorageName = localStorage.getItem('username');
        this.setState({ personInfo: localStorageName ? localStorageName : '登录/注册' })
    }

}
