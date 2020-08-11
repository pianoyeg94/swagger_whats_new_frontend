# Swagger Whats New (Frontend)

#### Ссылка на рабочий проект (link to deployed project): 
[https://www.swagger-whats-new.com](https://www.swagger-whats-new.com)

#### Ссылка на репозиторий бэкэнд части проекта (link to backend app repository): 
[Swagger Whats New (Backend)](https://github.com/pianoyeg94/swagger_whats_new_backend)

#### Ссылка на Docker Hub репозиторий (link to Docker Hub repository): 
[Docker Hub repository](https://hub.docker.com/repository/docker/pianoyeg94/swagger_whats_new_frontend)
<br />

## *Оглавление (Contents)*
| На русском                                                                               | In English                                                                    |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [1. Краткое описание проекта](#short-description-rus)                                    | [1. High-level project overview](#short-description-eng)                      |
| [2. Используемые технологии](#used-tech-rus)                                             | [2. Technologies used](#used-tech-eng)                                        |
| [3. Инструкция по запуску проекта локально](#instruction-rus)                            | [3. Instruction on how to launch this project locally](#instruction-eng)      |
| [4. Подробное описание возможностей проекта (бэкэнд репозиторий)](https://github.com/pianoyeg94/swagger_whats_new_backend#long-description-rus) | [4. Detailed project description (backend repository)](https://github.com/pianoyeg94/swagger_whats_new_backend#long-description-eng) |
| [5. Планы по развитию проекта](#future-plans-rus)                                        | [5. Future plans on developing this project](#future-plans-eng)               |
<br />

## <a name="short-description-rus">1. Краткое Описание проекта</a>
Фронтенд часть вэб приложения для команд разработки и тестирования, 
которое занимается отслеживанием истории изменений публичного интерфейса Rest API 
посредством интеграции с Open API (Swagger) и системами контроля версий 
(на данный момент поддерживаются интеграции с GitHub и Bitbucket).
<br />

## <a name="used-tech-rus">2. Используемые технологии</a>
 * Язык программирования - Typescript 3.7.5
 * Фронтенд фрэймворк - Angular 9 + NgRx (Redux pattern)
 * CSS препроцессор - SCSS
 * Деплой в "продакшн" - Google Kubernetes Engine
 * Сервер в "продакшене" - Nginx в качестве static content server внутри Kubernetes кластера
 * Бэкэнд технологии - Python 3.8, Django + Django Rest Framework, WSGI server - Gunicorn, reverse proxy - Nginx

## <a name="instruction-rus">3. Инструкция по запуску проекта локально</a>
1) Установить Docker + Docker Compose на локальной машине
2) Склонировать репозиторий
3) Список аккаунтов, созданных специально для публичного тестирования:
   - Тестовая почта: swagger_whats_new_test@mail.ru, пароль - 97442746d8b511ea87d00242ac130003
   - Тестовый почтовый сервер, на котором можно проверить письма, отправляемые приложением: mailtrap.io, логин - swagger_whats_new_test@mail.ru, 
     пароль - 97442746d8b511ea87d00242ac130003
   - Тестовый GitHub аккаунт для OAuth интеграции: логин - swagger-whats-new-test, пароль - 97442746d8b511ea87d00242ac130003
   - Тестовый Bitbucket аккаунт для OAuth интеграции: логин - swagger_whats_new_test@mail.ru, пароль - 97442746d8b511ea87d00242ac130003
4) Настроить js "переменные окружения" (файл "src/environments/environmentExample.ts", переименовать в "environment.ts"):
<pre>   
      {
        production: false,
        apiUrl: '<server host>/v1',
        githubOAuthUrl: 'https://github.com/login/oauth/authorize?client_id=16c0295bd6dea56dca7c&scope=admin:repo_hook',
        bitbucketOAuthUrl: 'https://bitbucket.org/site/oauth2/authorize?client_id=K38gWzR46jPa5hwYkz&response_type=code',
        pseudoSecretKey: 'any randomly generated key'
      } 
</pre>      
6) Запустить команду из корневой папки: \
   docker-compose up -d --build
7) Запустить команду "docker-compose logs -f angular-app", дождаться пока соберется приложение и начнет работу angular dev server на порту 4200
8) Порт и хост, на которым можно получить доступ к приложению:
    - http://localhost:4200 (Linux, Docker Desktop (Windows, MacOS))
    - http://192.168.99.100:4200 (Docker Toolbox (Windows, адрес виртуальной машины), IP адрес может быть другой)
9) Настроить OAuth GitHub application:    
    - Перейти на страницу https://github.com/settings/applications/1351939 (пароль и логин указан в пункте 3)
    - В поле "Homepage URL" указать - http://&#8249;docker host&#8250;:4200/swagger-projects
    - В поле "Authorization callback URL" указать - http://&#8249;docker host&#8250;:4200/vcs-accounts/post-registration
    - Сохранить
10) Подробную инструкцию по локальному запуску серверной части проекта можно найти в репозитории [Swagger Whats New (Backend)](https://github.com/pianoyeg94/swagger_whats_new_backend)

## <a name="future-plans-rus">5. Планы по развитию проекта</a>
 1) Добавить фильтры (серверная часть уже реализована) 
 2) Реализовать адаптивную верстку (пока поддерживается только формат пк и ноутбук мониторов)
 3) Улучшить дизайн
 4) Добавить систему серверных оповещений клиентской стороны посредством вэбсокетовб, интеграция клиентской стороны
<br />

## <a name="short-description-eng">1. High-level project overview</a>
This is the frontend part of the Swagger Whats New application mainly targetting developer and QA teams. 
The primary goal of this application is to track the history of Rest API public interface changes 
via integrations with Open API (Swagger) and version control systems 
(currently GitHub and Bitbucket are supported).
<br />

## <a name="used-tech-eng">2. Technologies used</a>
 * Programming language - Typescript 3.7.5
 * Frontend framework - Angular 9 + NgRx (Redux pattern)
 * CSS prepocessor - SCSS
 * Deploying to "production" - Google Kubernetes Engine
 * Server in "production - Nginx  as a static content server inside of a Kubernetes cluster
 * Backend technologies - Python 3.8, Django + Django Rest Framework, WSGI server - Gunicorn, reverse proxy - Nginx

## <a name="instruction-eng">3. Instruction on how to launch this project locally</a>
1) Download and install Docker + Docker Compose on your local machine
2) Clone this repository
3) List of accounts, created for public testing:
   - Test email address: swagger_whats_new_test@mail.ru, password - 97442746d8b511ea87d00242ac130003
   - Test mail server. Here you can check emails sent by the application: mailtrap.io, login - swagger_whats_new_test@mail.ru, password - 97442746d8b511ea87d00242ac130003
   - Test GitHub account for OAuth integration: login - swagger-whats-new-test, password - 97442746d8b511ea87d00242ac130003
   - Test Bitbucket account for OAuth integration: login - swagger_whats_new_test@mail.ru, password - 97442746d8b511ea87d00242ac130003
4) Configure js "environment variables" (file "src/environments/environmentExample.ts", rename to "environment.ts"):
<pre> 
      {
        production: false,
        apiUrl: '<server host>/v1',
        githubOAuthUrl: 'https://github.com/login/oauth/authorize?client_id=16c0295bd6dea56dca7c&scope=admin:repo_hook',
        bitbucketOAuthUrl: 'https://bitbucket.org/site/oauth2/authorize?client_id=K38gWzR46jPa5hwYkz&response_type=code',
        pseudoSecretKey: 'any randomly generated key'
      } 
</pre>   
6) Execute "docker-compose up -d --build"  from project's root directory
7) Execute "docker-compose logs -f angular-app", wait for build completion and angular dev server start up on port 4200
8) Host and port where you can gain access to the running application:
    - http://localhost:4200 (Linux, Docker Desktop (Windows, MacOS))
    - http://192.168.99.100:4200 (Docker Toolbox (Windows, VM address), exact IP address may be different)
9) Configure OAuth GitHub application:    
    - Go to https://github.com/settings/applications/1351939 (login and password are provided in step 3)
    - "Homepage URL" field - enter http://&#8249;docker host&#8250;:4200/swagger-projects
    - "Authorization callback URL" field - enter http://&#8249;docker host&#8250;:4200/vcs-accounts/post-registration
    - Save
10) A complete instruction on how to launch the backend part of the application you can find here: [Swagger Whats New (Backend)](https://github.com/pianoyeg94/swagger_whats_new_backend)

## <a name="future-plans-eng">5. Future plans on developing this project</a>
1) Add filters (already added on the server) 
2) Implement responsive design (currently only pc and laptop screens are supported)
3) Improve the overall design
4) Add server side notifications via websockets, client-side integration
