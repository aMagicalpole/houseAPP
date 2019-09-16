import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';

// 导入组件
import Main from './Main/Main'
import Chat from './Chat/Chat'
import History from './History/History'
import Mine from './Mine/Mine'

export default class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '首页',
            hidden: false,
            fullScreen: true,
            tabBarData: [
                { title: "首页", icon: 'home', icon_s: 'home_s' },
                { title: "微聊", icon: 'chat', icon_s: 'chat_s' },
                { title: "浏览", icon: 'footprint', icon_s: 'footprint_s' },
                { title: "我的", icon: 'mine', icon_s: 'mine_s' },
            ]
        };
    }

    // 动态渲染导航信息
    renderContent(pageText) {
        switch (this.state.selectedTab) {
            case '首页': return <Main h={this.props.history} />;
            case '微聊': return <Chat />;
            case '浏览': return <History />;
            case '我的': return <Mine h={this.props.history} />;
            default: break;
        }
    }

    render() {
        return (
            <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    {
                        this.state.tabBarData.map(obj => {
                            return <TabBar.Item
                                title={obj.title}
                                key={obj.title}
                                icon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${require(`../../assets/images/${obj.icon}.png`)} ) center center /  21px 21px no-repeat`
                                }}
                                />
                                }
                                selectedIcon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `url(${require(`../../assets/images/${obj.icon_s}.png`)} ) center center /  21px 21px no-repeat`
                                }}
                                />
                                }
                                selected={this.state.selectedTab === obj.title}
                                badge={''}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: obj.title,
                                    });
                                }}
                            >
                                {this.renderContent(obj.title)}
                            </TabBar.Item>
                        })
                    }
                </TabBar>
            </div>
        );
    }

}
