# Яндекс ШРИ 2021

## Задание 2. Подготовьте данные для Stories

### Использованные сторонние библиотеки:

- **webpack и webpack-cli** - удобная сборка и дев сервер
- **typescript** - ~~для удобного интеллисенса в IDE~~ чтобы в ногу себе лишний раз не стрелять
- **jest** - простой фреймворк для тестов
- **fakerjs** - чтобы быстро генерировать моковые данные для тестов

### Как быстро проверить работоспособность:

- Запустить статический (8887 порт) сервер в папке `src/__mockdata__`, я использовал [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?utm_source=chrome-app-launcher-info-dialog)
- Раскомментировать функцию `_test` в `src/index.ts`
- Выполнить `npm run dev` или `npm run build`
- Открыть в браузере `dev/test.html`

после этого в глобальном обьекте браузера появятся `_data_` (моковые данные), `_outdata_` (эталонный вывод) и функция `_test` из `index.ts`
