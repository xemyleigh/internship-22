import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage'
import { Provider } from 'react-redux';
import store from './slices/index'


function App() {
  console.log('app started')
  return (

      <Provider store={store}>
        <div className='container p-5 h-100' style={{ 'height': '100vh' }}>
          <div className='row flex-column justify-content-center h-100'>
            <MainPage />
          </div>
        </div>
      </Provider>

  );
}

export default App;
