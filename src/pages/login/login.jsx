import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./login.less";
import logo from "./images/logo.png";
import {login} from '../../api'
import storage from '../../utils/storageUtils'
import memory from '../../utils/memory'
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  timer = null
  onFinish = async (value) => {
    const {username, password} = value
    const data = await login(username, password)
    if(data.status === 0) {
      message.success('登陆成功！')
      const {data:user} = data
      memory.user = user
      storage.save('current_user', user)
      this.props.history.replace('/')
    }
  }
  validatorPass = (rule, value)  => {
    if(this.timer) {
      clearTimeout(this.timer)
    }
    return new Promise((resolve, reject) => {
      this.timer = setTimeout(() => {
        if(!value) {
          return reject("请输入密码!!")
        } else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
          return reject("请输入英文，数字或下划线")
        } else if(value.length < 4) {
          return reject("密码至少为4位以上")
        } else if(value.length > 16) {
          return reject("密码最多为16位")
        } else {
          return resolve()
        }
      }, 500)
    })
  }

  render() {
    if(memory.user._id) {
      return <Redirect  to='/'/>
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React: 后台管理</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form name="normal_login" className="login-form" onFinish={this.onFinish}>
            <Form.Item
              name="username"
              initialValue='admin'
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                  whitespace: false
                },
                {
                  max: 12,
                  message: "用户名最多为12位",
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "用户名必须为英文，数字或下划线组成",
                },
                {
                  min: 4,
                  message: "用户名至少为4位",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                // { required: true, message: "请输入密码" },
                () => ({
                  validator: this.validatorPass
                })
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
