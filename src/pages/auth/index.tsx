import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Form, Input, Checkbox, Button, message, notification } from 'antd';
import { useLoginAsDealerMutation } from "../../gql/generated/query.graphql";
import logo from "../../assets/images/Isuzu-Logo.png";
import { useAuthContext } from "../../utils/context";
import { Navigate, useNavigate } from "react-router-dom";

const UserLogin = (props: any) => {

    const [messageApi, contextHolder] = notification.useNotification();

    const authContext = useAuthContext();
    const navigate = useNavigate();

    // const onComp
    const [loginAsAdmin, { loading, data, error }] = useLoginAsDealerMutation({
      fetchPolicy: "no-cache",
      onError: (d) => {
        messageApi.error({
          type: "error",
          message: "Error",
          duration: 3000,
          placement: "bottom",
          description: d?.message
        })
      },
    });

    const onFinish = (values: any) => {
        try {
          loginAsAdmin({
            variables: {
              input: {
                password: values.password,
                emailId: values.username
              }
            },
            onCompleted: (d) => {
              authContext.login({
                user: d.loginAsDealer.dealerUser,
                token: d.loginAsDealer.accessToken
              })
              if (d.loginAsDealer?.accessToken){
                setTimeout(() => {
                  return navigate("/")
                }, 300);
              }
            }
          });

          
        } catch (err) {
          console.log(err);
        }
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

    return (
    <Row justify="center" align='middle' style={{ height: "100%"}}>
      <Col span={6}>
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <img src={logo} style={{ width: "100%", marginBottom: 15}}/>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    {contextHolder}
      </Col>
    </Row>
    )
}

export default UserLogin;