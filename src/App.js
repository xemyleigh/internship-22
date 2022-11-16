import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import StoryPage from './components/StoryPage'
import { ToastContainer as Toaster } from 'react-toastify';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/:id">
          <StoryPage />
        </Route>
      </Switch>
      <Toaster />
    </Router>
  );
}

export default App;
