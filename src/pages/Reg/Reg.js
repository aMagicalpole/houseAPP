import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Reg.css'

import { Flex, WhiteSpace, WingBlank, InputItem, Button, Radio } from 'antd-mobile'

//导入axios接口
import { regApi, checkCodeApi } from '../../api/api'

export default class Reg extends Component {

    constructor() {
        super()
        this.state = {
            phone: '',
            pwd: '',
            oldPhone: '',
            oldPwd: '',
            checkCode: '',
            agreement: false,
            message: '',
            code: '验证码'
        }
    }

    render() {
        return (
            <div style={{ 'width': '100%', 'height': '100%' }}>
                <Flex align='center' justify='center' style={{ width: '100%', height: '100%' }}>
                    <div style={{ paddingBottom: "100px" }}>

                        {/* 输入框 */}
                        {/* 手机 */}
                        <WingBlank>
                            <InputItem
                                placeholder="请输入手机"
                                value={this.state.phone}
                                onChange={(val) => this.setState({ phone: val })}
                                clear
                                type="password"
                            >
                                <div style={{
                                    backgroundImage: `url(${require('../../assets/images/user.png')})`, backgroundSize: 'cover', height: '22px', width: '22px'
                                }} />
                            </InputItem>
                            {/* 密码 */}
                            <InputItem
                                placeholder="请输入密码"
                                value={this.state.pwd}
                                onChange={(val) => this.setState({ pwd: val })}
                                clear
                            >
                                <div style={{
                                    backgroundImage: `url(${require('../../assets/images/password.png')})`, backgroundSize: 'cover', height: '22px', width: '22px'
                                }} />
                            </InputItem>
                            {/* 验证码 */}
                            <InputItem
                                extra={this.state.code}
                                value={this.state.checkCode}
                                onChange={(val) => this.setState({ checkCode: val })}
                                onExtraClick={this.getCheckCode.bind(this)}
                                placeholder='请输入验证码'
                            ></InputItem>

                            <WhiteSpace />
                            <div style={{ height: '20px', color: '#FF6266', textIndent: '15px' }}>{this.state.message}</div>

                            {/* 同意协议 */}
                            <Flex style={{ padding: '15px' }}>
                                <Flex.Item>
                                    <Radio className="my-radio" style={{ color: '#ccc' }}
                                        checked={this.state.agreement}
                                        onChange={() => this.setState({ agreement: true })}
                                    > 我已同意
                                    <Link to='/reg' style={{ color: "#f00" }}>《用户同意协议》</Link>及
                                    <Link to='/reg' style={{ color: "#f00" }}>隐私政策</Link>

                                    </Radio>
                                </Flex.Item>
                            </Flex>

                            {/* 提交按钮 */}
                            <Button style={{ backgroundColor: "#1296db", color: "#efefef" }}
                                onClick={this.registor.bind(this)}>注册</Button>
                            <WhiteSpace size='md' />


                            {/* 登录跳转标签 */}
                            <Flex justify="between">
                                <Link to='/login' style={{ color: '#1296db' }}>已有账号 登录</Link>
                            </Flex>

                        </WingBlank>
                    </div>
                </Flex>

                {/* 底部同意协议 */}
                <div style={{ width: '100%', position: 'fixed', 'bottom': '20px', left: '0', textAlign: 'center' }}>
                    <Link to='/login' >
                        <span style={{ textAlign: 'center', color: '#aaa' }}>登录/注册即代表同意《房产查询用户协议》</span>
                    </Link>
                </div>

            </div>
        )
    }

    async getCheckCode() {
        let data = await checkCodeApi();
        this.setState({ code: data.checkCode })
    }

    // 注册
    async registor() {
        if (this.state.agreement) {
            let { phone, oldPhone, pwd, oldPwd, checkCode } = this.state;
            if (phone === oldPhone && pwd === oldPwd) {
                if (phone === '' && pwd === '') this.setState({ message: '请输入用户名或密码！！！' })
            } else {
                // 提交表单
                let data = await regApi(phone, pwd, checkCode);
                if (data.code === 1) {
                    this.setState({ message: data.message });
                    // 延时跳转
                    setTimeout(() => {
                        this.props.history.push('/login')
                    }, 200)
                } else {
                    this.setState({ message: data.message })
                }
            }


        } else {
            this.setState({ message: '请同意用户协议!' })
        }


        // console.log(this)
        // alert("注册成功")
        // this.props.history.push('/login')
    }
}
