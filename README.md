
# eskimidsp
# run the following commands to install eskimidsp
    git clone https://github.com/jobayedsumon/eskimidsp.git
    
    cd eskimidsp
    
    git clone https://github.com/laradock/laradock.git
    
    cd laradock
    
    cp .env.example .env
    
    docker-compose up -d nginx mysql
    
    docker-compose exec workspace bash
    
    composer install
    
    cp .env.example .env
    
    php artisan key:generate

# run the following commands to create database
    
    docker-compose exec mysql bash
    
    mysql -uroot -proot
    
    CREATE DATABASE advertisement_campaigns;

# make sure the project .env file has the following configurations

    DB_CONNECTION=mysql
    DB_HOST=mysql
    DB_PORT=3306
    DB_DATABASE=advertisement_campaigns
    DB_USERNAME=root
    DB_PASSWORD=root

# run the following command to create the tables

    php artisan migrate

# run the following command to test the api endpoints
    php vendor/bin/phpunit
  
#run the following command to seed the database  
    php artisan db:seed


