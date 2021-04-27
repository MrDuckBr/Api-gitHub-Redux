import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Home from "./Home";
//import Favorites from "./Pages/Favorites";
import {Layout} from 'antd';
import 'antd/dist/antd.css';


function App() {
  return (
     <Layout.Content style={{padding:20}}>
  <Router>
  <h1>API GitHub - Usando Redux</h1> 
    <Switch>
    <Route exact path="/">
      <Home/>
    </Route>
   
    </Switch>
  </Router>
  </Layout.Content>
)
}

export default App;