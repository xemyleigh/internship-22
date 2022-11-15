import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import StoryPage from './components/StoryPage'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNews } from "./fetchApi";
import { ToastContainer as Toaster, toast } from 'react-toastify';

function App() {

  // const [ updateTimer, setUpdateTimer ] = useState(0)
  // const dispatch = useDispatch()

  // setTimeout(function run() {
  //     setUpdateTimer(updateTimer + 1)
  //     setTimeout(run, 60000);
  // }, 60000);    

  // useEffect(() => {
  //   try {
  //     dispatch(fetchNews())
  //   } catch(e) {
  //     if (e.isAxiosError) {
  //       toast('No internet connection')
  //     } else {
  //       toast('Unknown error')
  //     }
  //   }
  // }, [updateTimer])

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
