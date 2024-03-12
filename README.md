
# Blog app -API

Thiis is a sample Backend project developed with Node.js, express.js, MySQL2 with sequelize ORM


### How to run this project in your system?
- Install Node js on your system
- Install MySQL 
- Install MySQL workbench (optional)
- Install Sequelize CLI using command
```cmd
npm install -g sequelize-cli
```
        
- Clone this repository to your local machine and open in VSCode and run the follwing command in VSCode integrated terminal
```bash
npm install
```
- Create Database named "blogDb" in MySQL (by using terminal or workbench)
- Create ```config.json``` file in ```/config/ ```folder and copy & paste following code
```json
{
  "development": {
    "username": "user_name",
    "password": "password",
    "database": "blogDb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
- Replace user_name and password with your MySQL username and password in ```config.json```
- Create ```.env``` file in project's root folder and copy&paste follwing lines
```
NODE_ENV=development
JWT_SECRET=secret
```
- You can use your own secret key for JWT (optional)
- Open the VSCode integrated terminal and run the following command one by one
```cmd
sequelize db:migrate
```
```cmd
sequelize db:seed:all
```
- Run the server using follwing command
```bash
npm start
```
- To get swagger api documentation open the following url in your browser
```
http://localhost:3000/api/documentation
```


