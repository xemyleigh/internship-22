import ReactDOM from 'react-dom/client';
import './index.css';
import init from './init'

const root = ReactDOM.createRoot(document.getElementById('root'));
const vdom = init()
root.render(vdom);

