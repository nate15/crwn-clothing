import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage/homepage.componet';
import {Switch,Route} from 'react-router-dom';


const Hats = () => (
  <h1>Hats</h1>

);

function App() {
  return( 
   <div> 
     <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/shop/hats" component={Hats} />
     </Switch>
   </div>
  )
}

export default App;
