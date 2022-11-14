import App from './App';
import { Provider } from 'react-redux';
import store from './slices/index'





export default () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}