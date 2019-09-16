import React, { Component } from 'react'
import cityList from '../../json/city.json'

import { WingBlank } from 'antd-mobile'
import BScroll from 'better-scroll'

export default class address extends Component {

    constructor() {
        super()

        this.state = {
            cityList: []
        }
    }

    render() {
        return (
            <div style={{ height: '100%' }}>

                <div className='wrapper' style={{ height: '100%', overflow: 'hidden' }}>
                    <ul className='content' style={{ padding: '0', margin: '0', width: '100%', overflow: 'hidden' }}>
                        {
                            this.state.cityList.map(obj => {
                                return <li key={obj.name} id={obj.name}>
                                    <p style={{ backgroundColor: '#F8F8F9', padding: '10px', margin: '0' }}>{obj.name === 'hot' ? '热' : obj.name}</p>
                                    <WingBlank>
                                        {
                                            obj.citys.map(city => {
                                                return <div key={city} style={{ padding: '10px 0', borderBottom: '1px solid #f8f8f9' }}>{city}</div>
                                            })
                                        }
                                    </WingBlank>
                                </li>

                            })
                        }
                    </ul>
                </div>

                {/* 边上导航条 */}
                <div style={{ width: '18px', position: 'fixed', right: '0px', top: '100px' }}>
                    {
                        this.state.cityList.map(obj => {
                            return <div key={obj.name} onClick={this.select.bind(this, obj.name)} style={{ padding: '2px 0' }}>{obj.name === 'hot' ? '热' : obj.name}</div>
                        })
                    }
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.setState({ cityList })
        this.scroll = new BScroll('.wrapper')
    }

    select(val) {
        this.scroll.scrollToElement('#' + val,500)
    }
}