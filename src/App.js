import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import StoryPage from './components/StoryPage'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNews } from "./slices/newsSlice";





function App() {
  const [ updateTimer, setUpdateTimer ] = useState(0)
  const dispatch = useDispatch()

  console.log('dfdfdfd')
  setTimeout(function run() {
      setUpdateTimer(updateTimer + 1)
      setTimeout(run, 60000);
  }, 60000);    

  useEffect(() => {
      dispatch(fetchNews())
      // setFirstDownloadStatus('done')

  }, [updateTimer])



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
            </Router>


  );
}

export default App;
