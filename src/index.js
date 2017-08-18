import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';
// import App from './components/App';
// import About from './components/About';
// import Repos from './components/Repos';

class Com extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/com1">com1</Link></li>
          <li><Link to="/com2">com2</Link></li>
        </ul>
      </div>
    )
  }
}
class Com1 extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/com1/para01/para02">aaa</Link></li>
          <li><Link to="/com1/para03/para04">bbb</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
class Com2 extends Component {
  render() {
    return <p>Com2</p>
  }
}
class Com22 extends Component {
  render() {
    return <p>Com2</p>
  }
}
class Com3 extends Component {
  render() {
    return <p>{this.props.params.com3}</p>
  }
}
class Com4 extends Component {
  render() {
    return <p>Com4</p>
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={Com} />
    <Route path="/com1" component={Com1}>
    {/* 这样放置相当于把com3作为com1的子元素，从props中获取并渲染 */}
      <Route path="/com1/:com3/:com4" component={Com3} />
    </Route>
    <Route path="/com2" component={Com2} />
  </Router>
), document.getElementById('root'))

