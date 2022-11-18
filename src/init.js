import App from './components/App';
import { Provider } from 'react-redux';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18next from 'i18next'
import en from './locales/en'
import store from './slices/index'

export default () => {

    const i18n = i18next.createInstance();
    i18n
    .use(initReactI18next)
    .init({
      resources: {
        en,
      },
      lng: 'en',
      fallbackLng: 'en',
    });

    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <App />
            </Provider>
        </I18nextProvider>
    )
}