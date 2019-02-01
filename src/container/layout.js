import React from 'react';
import TopNav from "../components/TopNav"
import { Row,Col } from "antd"

export default class Layout extends React.Component{
  render(){
    return(
      <div>
         <TopNav />
         <Row>
          <Col span={2}></Col>
          <Col span={20}>
            { this.props.children }
          </Col>
          <Col span={2}></Col>
         </Row>
      </div>
    )
  }
}
