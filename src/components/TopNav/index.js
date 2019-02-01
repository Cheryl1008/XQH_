import React from 'react';
import { Row, Col, Menu, Icon ,Button,Modal,Tabs,Form,Input,message} from 'antd';
import { Link } from "react-router"
import { httpPost } from "../../http/http.js"
import "./style.css"

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class TopNav extends React.Component{

  constructor(){
    super();
    this.state = {
      current:'top',
      isLogined:false,
      visible:false,
      actions:"1",  // 1:登录  2:注册
      nick:""
    }
  }

  componentDidMount(){
    // 读取本地数据
    const nick = localStorage.getItem("nick");
    if(nick){
      this.setState({
        isLogined:true,
        nick:nick
      })
    }else{
      // 未登录
    }
  }

  clickMenuHandler(event){
    this.setState({
      current:event.key
    })
    if(event.key == "login"){
      this.setState({
        visible:true
      })
    }
  }

  handleOk(){
    this.setState({
      visible:false
    })
  }
  handleCancel(){
    this.setState({
      visible:false
    })
  }

  changeTabsHandler(key){
    this.setState({
      actions:key
    })
  }

  // 表单事件
  handleSubmit(event){
    event.preventDefault();
    this.props.form.validateFields((error,values) => {
      if(error){
        console.log(error);
        return;
      }
      if(this.state.actions == "1"){
        // 登录
        const resultLogin = httpPost("api/login",{
          username:values.username,
          password:values.password
        })

        resultLogin.then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          if(data.length > 0){
            // 成功
            this.setState({
              isLogined:true,
              visible:false,
              nick:data[0].username
            })

            // 存储登录信息
            localStorage.setItem("nick",data[0].username);

          }else{
            // 失败了 给出用户提示
            message.error(data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        })

      }else if(this.state.actions == "2"){
        // 注册
        var resultRegister = httpPost("api/register",{
          username:values.register_username,
          password:values.register_password
        })
        resultRegister.then(res => {
          return res.json();
        })
        .then(data => {
          // 给出用户注册成功
          message.success(data.msg);
        })
        .catch(error => {
          console.log(error);
        })
      }
    })
  }

  // 退出登录
  logoutHandler(event){
    this.setState({
      isLogined:false
    })
    // 删除存储数据
    localStorage.removeItem("nick");
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    let showView = this.state.isLogined
    ?
    <Menu.Item className="login" key="register">
      <Button type="primary">个人中心</Button>
      <Button>{this.state.nick}</Button>
      <Button onClick={this.logoutHandler.bind(this)} type="primary">登出</Button>
    </Menu.Item>
    :
    <Menu.Item className="login" key="login">
      登录|注册
    </Menu.Item>


    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Menu
            onClick={this.clickMenuHandler.bind(this)}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            >
              <Menu.Item key="top">
                <Link to="/top">
                  <Icon type="codepen" />头条
                </Link>
              </Menu.Item>
              <Menu.Item key="sports">
                <Link to="/sports">
                  <Icon type="dribbble" />体育
                </Link>
              </Menu.Item>
              <Menu.Item key="entertainment">
                <Link to="/entertainment">
                  <Icon type="instagram" />娱乐
                </Link>
              </Menu.Item>
              <Menu.Item key="technology">
                <Link to="/technology">
                  <Icon type="chrome" />科技
                </Link>
              </Menu.Item>
              <Menu.Item key="social">
                <Link to="/social">
                  <Icon type="appstore" />社会
                </Link>
              </Menu.Item>
              <Menu.Item key="ecnomics">
                <Link to="/ecnomics">
                  <Icon type="slack-square" />财经
                </Link>
              </Menu.Item>

              {showView}

            </Menu>

            <Modal
               title="登录与注册"
               visible={this.state.visible}
               onOk={this.handleOk.bind(this)}
               onCancel={this.handleCancel.bind(this)}
             >

             <Tabs defaultActiveKey="1" onChange={this.changeTabsHandler.bind(this)}>
               <TabPane tab="登录" key="1">
                <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                  <FormItem>
                    {getFieldDecorator('username', {
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入用户名" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                    })(
                      <Input type="password" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入密码" />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button type="primary" htmlType="submit">
                      登录
                    </Button>
                  </FormItem>
                </Form>
               </TabPane>
               <TabPane tab="注册" key="2">
                 <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                   <FormItem>
                     {getFieldDecorator('register_username', {
                     })(
                       <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入用户名" />
                     )}
                   </FormItem>
                   <FormItem>
                     {getFieldDecorator('register_password', {
                     })(
                       <Input type="password" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入密码" />
                     )}
                   </FormItem>
                   <FormItem>
                     {getFieldDecorator('register_confirm_password', {
                     })(
                       <Input type="password" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="重复输入密码" />
                     )}
                   </FormItem>
                   <FormItem>
                     <Button type="primary" htmlType="submit">
                       注册
                     </Button>
                   </FormItem>
                 </Form>
               </TabPane>
             </Tabs>
             </Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}

export default TopNav =  Form.create()(TopNav)
