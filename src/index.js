import React from 'react';
import ReactDOM from 'react-dom';
import { Router,Route,hashHistory } from "react-router"
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';
import './index.css';

// pc
import Layout from "./pc/container/layout.js"
import Guoji from "./pc/container/guoji.js"
import Guonei from "./pc/container/guonei.js"
import Keji from "./pc/container/keji.js"
import Tiyu from "./pc/container/tiyu.js"
import Yule from "./pc/container/yule.js"
import Top from "./pc/container/top.js"

// m
import MLayout from "./m/layout.js"

class App extends React.Component{
  render(){
    return(
      <div>
        <MediaQuery query="(min-device-width: 1224px)">
          <Router history={ hashHistory }>
            <Route path="/" component={ Layout }>
              <Route path="/top" component={ Top }></Route>
              <Route path="/yule" component={ Yule }></Route>
              <Route path="/tiyu" component={ Tiyu }></Route>
              <Route path="/keji" component={ Keji }></Route>
              <Route path="/guonei" component={ Guonei }></Route>
              <Route path="/guoji" component={ Guoji }></Route>
            </Route>
          </Router>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          <MLayout />
        </MediaQuery>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
