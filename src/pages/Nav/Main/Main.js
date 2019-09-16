import React, { Component } from 'react'

// 引入css样式
import './Main.css'
import { Flex, Carousel, WhiteSpace, Grid, WingBlank } from 'antd-mobile'

// 引入api接口和封装好的IP地址
import { likeApi, IP } from '../../../api/api'

//引入仓库连接函数
import { connect } from 'react-redux'

// 引入better-scroll
import BScroll from 'better-scroll'

class Main extends Component {

    constructor() {
        super()
        this.state = {
            address: '定位中',
            data: ['1', '2', '3'],
            imgHeight: 176,
            navContent: [
                { icon: 'icon01.png', text: '新房' },
                { icon: 'icon02.png', text: '二手房' },
                { icon: 'icon03.png', text: '租房' },
                { icon: 'icon04.png', text: '新房1' },
                { icon: 'icon05.png', text: '新房2' },
                { icon: 'icon06.png', text: '新房3' },
                { icon: 'icon07.png', text: '新房4' },
                { icon: 'icon08.png', text: '新房5' }
            ].map(obj => {
                return { icon: require('../../../assets/images/' + obj.icon), text: obj.text }
            }),
            methods: [
                { icon: 'icon01.png', text: '新房' },
                { icon: 'icon02.png', text: '二手房' },
                { icon: 'icon03.png', text: '租房' },
                { icon: 'icon04.png', text: '新房1' }
            ].map(obj => {
                return { icon: require('../../../assets/images/' + obj.icon), text: obj.text }
            }),
            like: [{ //注册猜你喜欢地址
                area: "仁寿县",
                id: 1,
                imgs: "/imgs/1.jpg",
                name: "美的云溪郡",
                point: 117,
                price: 9000,
                range: "仁寿大道",
                type: "4室2厅"
            }]
        }
    }

    render() {
        return (
            <div className="main" style={{ height: '100%' }}>

                {/* 顶部 */}
                <div className="head" style={{ position: 'fixed', top: '0', zIndex: '999' }}>
                    <Flex justify='between' align='center'>
                        <div className="address" onClick={this.clickTo.bind(this, 'address')}>{this.state.address}</div>
                        <div className="search" onClick={this.clickTo.bind(this, 'search')}>
                            <img src={require('../../../assets/images/search.png')} alt="icon_search"></img>
                            <label>挑好房，上APP</label>
                        </div>
                        <div className='mapitem' onClick={this.clickTo.bind(this, 'mapitem')}>
                            <img style={{ width: '32px' }} alt='map' src={require('../../../assets/images/address.png')}></img>
                        </div>
                    </Flex>
                </div>
                <div className="wraper" style={{ height: '100%', overflow: 'hidden' }}>
                    <ul className="content">

                        {/* 顶部撑开 */}
                        <div style={{ height: '40px' }}></div>

                        {/* 轮播 */}
                        <Carousel
                            autoplay={false}
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.data.map(val => (
                                <a
                                    key={val}
                                    href="#/"
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={require('../../../assets/images/banner.png')}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: '375' });
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                        <WhiteSpace />

                        {/* 列表 */}
                        <Grid data={this.state.navContent} hasLine={false} activeStyle={false} />

                        {/* 房产百科 */}
                        <div style={{ border: '8px solid #eee', borderLeft: 0, borderRight: 0 }}>
                            <h2 style={{ fontSize: '18px', color: '#33A3F4', textIndent: '10px', marginBottom: 0 }}>
                                房产全百科
                    <label style={{ fontSize: '14px', marginLeft: '10px', color: '#aaa' }}>专业的买房攻略</label>
                            </h2>
                            <Grid data={this.state.methods} hasLine={false} activeStyle={false} />
                        </div>


                        {/* 猜你喜欢 */}
                        <div>
                            <h2 style={{ fontSize: '18px', color: '#555', textIndent: '10px', marginBottom: 0 }}>
                                猜你喜欢
                    </h2>
                            <WingBlank size='sm'>
                                {
                                    this.state.like.map(obj => {
                                        return <div key={obj.name} onClick={this.ClickLike.bind(this, obj)}>
                                            <Flex justify='between' align='start'>
                                                <img alt='house' style={{ width: '100px', height: '110px' }} src={obj.imgs}></img>
                                                <div style={{ textAlign: 'left', width: '50%', textIndent: '10px', fontSize: '14px' }}>
                                                    <h3 style={{ fontSize: '20px', margin: '10px 0' }}>
                                                        {obj.name}
                                                    </h3>
                                                    <div style={{ color: '#888' }}>
                                                        <div>{obj.area}&ensp;{obj.range}</div>
                                                        <WhiteSpace />
                                                        <div>{obj.type}&ensp;{obj.point}平</div>
                                                    </div>
                                                </div>
                                                <label style={{ width: '100px', fontSize: '18px', color: '#f00', textAlign: 'right' }}>{obj.price}/平</label>
                                            </Flex>
                                            <WhiteSpace />
                                        </div>
                                    })
                                }
                            </WingBlank>
                        </div>
                    </ul>
                </div>
            </div >
        )
    }

    async componentDidMount() {
        // 缓存this
        const _this = this;
        // 高德地图定位
        //实例化城市查询类
        var citysearch = new window.AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                    _this.setState({ address: cityinfo })

                }
            } else {
                _this.setState({ address: result.info })
            }
        });

        // 猜你喜欢,后台请求
        let data = await likeApi();
        this.setState({
            like:
                data.data.map(obj => {
                    return {
                        area: obj.area,
                        id: obj.id,
                        imgs: IP + obj.imgs,
                        name: obj.name,
                        point: obj.point,
                        price: obj.price,
                        range: obj.range,
                        type: obj.type
                    }
                })
        })


        // 滑动效果Better-Scroll注册
        this.scroll = new BScroll('.wraper', {
            click: true
        })
    }

    // 猜你喜欢添加到历史记录中
    ClickLike(obj) {
        this.props.dispatch({ type: 'addHistory', obj })
    }


    // 顶部搜索点击跳转
    clickTo(val) {
        switch (val) {
            case 'address':
                this.props.h.push('/selectCity')
                break;
            case 'search':
                this.props.h.push('/search')
                break;
            case 'mapitem':
                this.props.h.push('/mapItem')
                break;
            default:
                this.props.h.push('/')
                break;
        }
    }
}


export default connect()(Main)