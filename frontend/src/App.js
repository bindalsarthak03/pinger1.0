import './App.css';
import { Button } from '@chakra-ui/react'
import { Route } from 'react-router-dom'
import HomPage from './Pages/HomPage';
import ChatPage from './Pages/ChatPage';
function App() {
  return (
    <div className="App">
      <Route path='/'component={HomPage} exact/>
      <Route path='/chat'component={ChatPage}/>

    </div>
  );
}

export default App;
