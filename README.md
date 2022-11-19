# Hacker News Interface
## Description
This application is an interface for public [Hacker News Api](https://github.com/HackerNews/API). Here you can watch last 100 news with author, title, publication date and its rating. You can also open news card to see the tree of comments. 
### en
The application is built on the React + Redux stack. The data in the state is normalized, each of the slices is responsible for its own data. Functionality for opening a page with news by direct link is also implemented. The texts in the application are organized with i18n, which makes it convenient to work with them from a single file. To work with the api in the fetchApi file were created functions that put data in relevant sections of the state. Routing is implemented with React Router v5. Package manager - yarn.

### ru
Приложение построено на стеке React + Redux. Данные в стейте нормализованны, каждый из слайсов отвечает за свою область. Реализован функционал по открытию страницы с новостью по прямой ссылке. Тексты в приложении организованы с помощью i18n, из-за чего с ними удобно работать из одного файла. Выполнена обработка ошибок через toasts. Для работы с api создан файл fetchApi, с помощью функций из которого нормализованные данные попадают в нужные разделы стейта. Роутинг реализован на React Router v5. Пакетный менеджер - yarn.

## How to run the app

In console:
````
git clone git@github.com:xemyleigh/internship-22.git
````
Then in project directory:
````
make run
````
The application will be run on port 3000 (http://localhost:3000)
