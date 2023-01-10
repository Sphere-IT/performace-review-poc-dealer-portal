import React, { useState } from "react";
import { Col, Row, Form, Input, Button, notification, Modal, Typography } from 'antd';
import { Notification_Type, useCreateForgotPasswordNotificationMutation, useLoginAsDealerMutation } from "../../gql/generated/query.graphql";
import logo from "../../assets/images/Isuzu-Logo.png";
import { useAuthContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import "../../assets/login.styles.css";

const UserLogin = (props: any) => {

    const [messageApi, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notError, setNotError] = useState("");
    const [emailId, setEmailId] = useState("");
    // const 

    const authContext = useAuthContext();
    const navigate = useNavigate();

    // const onComp
    const [loginAsAdmin, { loading, data, error }] = useLoginAsDealerMutation({
      fetchPolicy: "no-cache",
      onError: (d) => {
        messageApi.error({
          type: "error",
          message: "Error",
          duration: 1500,
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

      const [createNotification, { loading: passLoading }] = useCreateForgotPasswordNotificationMutation();

      const handleOk = () => {
        createNotification({
          variables: {
            input: {
              isRead: false,
              notificationTitle: "Change password request",
              notificationDescription: `Dealer with email id: ${emailId} requested to change password`,
              notificationIdentifier: emailId,
              notificationScreen: Notification_Type.Dealer
            }
          },
          onCompleted: () => {
            setIsModalOpen(false);
            setEmailId("");
            messageApi.success({
              type: "success",
              message: "Success",
              duration: 1500,
              placement: "bottom",
              description: "One of our team members will contact you shortly"
            })
          },
          onError: (e) => {
            setIsModalOpen(false);
            setEmailId("");
            messageApi.error({
              type: "error",
              message: "Error",
              duration: 1500,
              placement: "bottom",
              description: e?.message || "An error occurred"
            })
          }
        })
      }
      const handleCancel = () => {
        setIsModalOpen(false);
      }

    return (
    <Row justify="start" align='middle' style={{ height: "100%"}} className="login-container">
      <Col span={8} offset={3} className="form-container">
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
        style={{ width: "80%"}}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ width: "80%"}}
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 12 }} style={{ display: "flex", justifyContent: 'center'}}>
        <Button onClick={() => setIsModalOpen(true)}>Forgot your password?</Button>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12 }} style={{ display: "flex", justifyContent: 'center'}}>
        <Button type="primary" htmlType="submit" disabled={loading} loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    {contextHolder}
      </Col>

      <Col span={12}></Col>

      <Modal title="Forgot password" open={isModalOpen} okText="Confirm" okButtonProps={{
        disabled: !emailId?.length ? true : false,
        loading: passLoading
      }} onOk={handleOk} onCancel={handleCancel}>
        <Typography.Paragraph>Please insert your email below</Typography.Paragraph>
        <Input placeholder="Email id" 
        status={!emailId?.length ? "error" : undefined}
        value={emailId} 
        onChange={(e) => {
          if (!emailId?.length){
            setNotError("Cannot be empty")
          }else{
            setNotError("")
          }
          setEmailId(e.target.value)
        }}  />
      </Modal>
    </Row>
    )
}

export default UserLogin;