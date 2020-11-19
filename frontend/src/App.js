import React from 'react'; 
//import NavBar from './navBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home} from './Home';
import {About} from './About';
import {Services} from './Services';
import {NoMatch} from './NoMatch';

class App extends Component {
  render() {
    return (
      <ReactFragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </ReactFragment>
    );
  }
}

export default App;