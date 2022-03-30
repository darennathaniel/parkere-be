# parkere-be

Remember to always:
1. `git pull`
2. `npm install`

To run the server, type
`npm start`

for first time:
1. git clone https://github.com/darennathaniel/parkere-be.git
2. open folder in vscode
3. npm install
4. npm install nodemon -D (installing nodemon for devDependency)

run postgres (install psql and set username = postgres, password):
1. psql -U postgres or psql -u your username or sudo -u postgres psql
2. insert password
3. \l to see all database
4. CREATE DATABASE parkere (in psql)
5. \c parkere (to go in to the datbase)
6. \dt (to see all the table)

create table in postgres
1. go to command prompt cd to the parkere-be, then cd sql
2. log in to the psql -U postgres or sudo -u postgres psql
3. \c parkere
4. \i carpark.sql
5. \i favorite.sql
6. \i review.sql
7. \i user.sql
8. \dt (check if all the table is created in the parkere database)

in .env :
PG_USER = your username
PG_PASSWORD= your password
PG_HOST = localhost
PG_PORT = 5432
PG_DATABASE = parkere
