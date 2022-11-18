import MainPage from './MainPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import StoryPage from './StoryPage'
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
