import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { loginApi } from '../../api/api'

// 引入antd
import { Flex, WhiteSpace, WingBlank, InputItem, Button } from 'antd-mobile';

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            pwd: '',
            message: '',
            oldUser: '',
            oldpwd: ''
        }
    }

    render() {
        return (
            <div style={{ 'width': '100%', 'height': '100%' }}>
                <Flex align='center' justify='center' style={{ width: '100%', height: '100%' }}>
                    <div style={{ paddingBottom: "100px" }}>
                        {/* 顶部logo */}
                        <Flex justify='center'>
                            <img style={{ width: '150px', height: '100px' }} alt="房产查询平台"
                                src={require('../../assets/images/logo.png')} />
                        </Flex>
                        <h2 style={{ textAlign: 'center', color: "#1296db" }}>房产查询平台</h2>

                        {/* 输入框 */}

                        <WingBlank>
                            {/* 用户名 */}
                            <InputItem
                                placeholder="请输入用户名"
                                value={this.state.username}
                                onChange={(val) => this.setState({ username: val })}
                                clear
                            >
                                <div style={{
                                    backgroundImage: `url(${require('../../assets/images/user.png')})`, backgroundSize: 'cover', height: '22px', width: '22px'
                                }} />
                            </InputItem>

                            {/* 密码 */}
                            <InputItem
                                placeholder="请输入密码"
                                value={this.state.pwd}
                                type='password'
                                onChange={(val) => this.setState({ pwd: val })}
                                clear
                            >
                                <div style={{
                                    backgroundImage: `url(${require('../../assets/images/password.png')})`, backgroundSize: 'cover', height: '22px', width: '22px'
                                }} />
                            </InputItem>
                            <div style={{ height: '20px', color: '#FF6266' }}>{this.state.message}</div>

                            {/* 提交按钮 */}
                            <Button style={{ backgroundColor: "#1296db", color: "#efefef" }} onClick={this.login.bind(this)}>登录</Button>
                            <WhiteSpace size='md' />

                            {/* 注册和忘记密码跳转标签 */}
                            <Flex justify="between">
                                <Link to='/reg' style={{ color: '#1296db' }}>注册</Link>
                                <Link to='/reg' style={{ color: '#1296db' }}>忘记密码</Link>
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

    // 登录
    async login() {
        let { username, pwd, oldUser, oldpwd } = this.state;
        if (oldUser === username && oldpwd === pwd) {

        } else {
            this.setState({
                oldUser:username,
                oldpwd : pwd
            })
            let data = await loginApi(username, pwd)
            if (data.code === 1) {
                this.props.history.replace('/')
                localStorage.setItem('username',username)
            } else {
                this.setState({ message: data.message })
            }
        }


    }
}
