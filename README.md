# Shelter evaluation

TODO: Add short description of the project

## Requirements

* NodeJS: v14.17.3
* Docker: v20.10.7
* Docker compose: v1.28.5

## Getting started (only tested on linux)

The first time you run the project you have to execute this command.

```bash
npm install
npm run prepare
```

### Runing the project localy

```bash
npm run docker:prod:up # This command laucnh localy production environment
npm run docker:prod:migration:run # Populate the database
```

### Default login

Access url: https://shelter-evaluation.cruzroja.com/login

```
username: root@shelterevaluation.com
password: root
```

## Frecuently use commands

### Mysql

Connect to mysql
```bash
mysql -u $MYSQL_USER -p $MYSQL_PASSWORD
```