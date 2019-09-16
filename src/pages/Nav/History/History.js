import React, { Component } from 'react'

// 引入Atid
import { WingBlank, WhiteSpace, Flex } from 'antd-mobile'

import { connect } from 'react-redux'

class History extends Component {



    render() {
        let DOM = null;
        if (this.props.historyArr.length === 0) {
            DOM = <h3 style={{ margin: 0, padding: '20px 0' }}>空空如也</h3>
        }
        return (
            <div style={{ height: '100%' }}>
                <div style={{ position: 'fixed', top: '0', width: '100%', zIndex: 999 }}>
                    <p style={{ lineHeight: '40px', margin: 0, backgroundColor: '#33A3F4', color: '#fff', textAlign: 'center' }}>历史记录</p></div>


                <div id="mywrapper" style={{ height: '100%', overflow: 'auto' }}>
                    <ul className='content'>
                        <div>
                            <WingBlank size='sm'>
                                {/* 撑开顶部 */}
                                <div style={{ height: '40px' }}></div>
                                {DOM}
                                {
                                    this.props.historyArr.map(obj => {
                                        return (<div key={obj.name}>
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
                                        </div>)
                                    })

                                }
                            </WingBlank>
                        </div>
                    </ul>
                </div>
            </div >
        )
    }

}

export default connect(state => {
    return {
        historyArr: state.historyArr
    }
}
)(History)