CREATE DATABASE food_app;
use food_app;


CREATE TABLE users (
id INT auto_increment primary key,
username varchar(100),
email varchar(100) unique,
password varchar(100)
);


CREATE TABLE restaurants (
id INT auto_increment primary key,
name varchar(100),
address varchar(255),
rating decimal(2,1),   #total digits=2 and 1 for decimal , no 10.0 allowed
distance varchar(20),
category varchar(100)
);


CREATE TABLE food (
id INT auto_increment primary key,
name varchar(100),
price decimal(10,2),   
category varchar(100),
image_url varchar(255),
restaurant_id int,
foreign key (restaurant_id) references restaurants(id)
);


CREATE TABLE orders (
id INT auto_increment primary key,
user_id int,
total_amount decimal(10,2),
status varchar(50),
created_at timestamp default current_timestamp,
foreign key (user_id) references users(id)
);


CREATE TABLE order_items (
id INT auto_increment primary key,
order_id int,
food_id int,
quantity int,
price decimal(10,2),
foreign key (order_id) references orders(id),
foreign key (food_id) references food(id)
);
