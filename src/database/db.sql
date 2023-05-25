-- CREATE DATABASE
DROP DATABASE IF EXISTS burgers;
CREATE DATABASE burgers;
USE burgers;

-- CREATE TABLES
CREATE TABLE IF NOT EXISTS User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  picture VARCHAR(255),
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Burger (
  burger_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  burger_name VARCHAR(255) NOT NULL,
  bread_type VARCHAR(255) NOT NULL,
  meat_type VARCHAR(255) NOT NULL,
  cheese_type VARCHAR(255) NOT NULL,
  sauce_type VARCHAR(255) NOT NULL,
  vegetable_type VARCHAR(255) NOT NULL,
  toppings_type VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  picture VARCHAR(255) NOT NULL,
  time_to_prepare INT NOT NULL,
  difficulty INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE IF NOT EXISTS Ranking (
  rating_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  burger_id INT NOT NULL,
  rating INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (burger_id) REFERENCES Burger(burger_id)
);

CREATE TABLE IF NOT EXISTS BurgerRestaurant (
  restaurant_id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone INT NOT NULL,
  website VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL
);

CREATE TABLE IF NOT EXISTS Burgers_in_restaurant (
  restaurant_burger_id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  burger_id INT NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES BurgerRestaurant(restaurant_id),
  FOREIGN KEY (burger_id) REFERENCES Burger(burger_id)
);

-- CREATE TABLE Ingredients
CREATE TABLE IF NOT EXISTS Ingredients (
  ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
  ingredient_name VARCHAR(255) NOT NULL,
  ingredient_type VARCHAR(255) NOT NULL
);

-- INSERT Ingredients
INSERT INTO Ingredients (ingredient_name, ingredient_type) VALUES
('Pan normal', 'Bread'),
('Pan brioche', 'Bread'),
('Pan integral', 'Bread'),
('Lechuga', 'Vegetable'),
('Tomate', 'Vegetable'),
('Cebolla', 'Vegetable'),
('Pepinillos', 'Vegetable'),
('Cheddar', 'Cheese'),
('Gouda', 'Cheese'),
('Queso azul', 'Cheese'),
('Ketchup', 'Sauce'),
('Mayonesa', 'Sauce'),
('Mostaza', 'Sauce'),
('Barbacoa', 'Sauce'),
('Cerdo', 'Meat'),
('Pollo', 'Meat'),
('Vaca', 'Meat'),
('Cebolla crujiente', 'Topping'),
('Huevo', 'Topping'),
('Bacon', 'Topping');


-- CREATE USER
-- -----------

INSERT INTO User (username, email, picture, password)
VALUES
('admin', 'admin@gmail.com', 'profile_1.jpg','123'),
('pablo', 'pablo@gmail.com', 'profile_2.jpg','$2a$08$7O2KIy34D3PDl85emvHZtOdc658BpISxM3OBKpffjwceAJhloS1om');
-- COMMENT password: 123


-- INSERTS BURGERS AND RESTAURANTS
-- -------------------------------

-- SANCHO CASUAL BURGER
INSERT INTO BurgerRestaurant (restaurant_name, address, phone, website, latitude, longitude)
VALUES ('Sancho Casual Burger', 'C. Tejeiro, 20, 18005 Granada', 958254654, 'http://www.sanchocasualburger.com/', 37.1811457, -3.6156794);

SET @restaurant_id = LAST_INSERT_ID();

-- BURGER #1
INSERT INTO Burger (user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture)
VALUES (1, 'White Castle burger', 'Pan brioche', 'Picada de vaca', 'Cheddar', 'Salsa ahumada', '', '', '', '');

SET @burger_id = LAST_INSERT_ID();

INSERT INTO Burgers_in_restaurant (restaurant_id, burger_id)
VALUES (@restaurant_id, @burger_id);

-- BURGER #2
INSERT INTO Burger (user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture)
VALUES (1, 'Muuu Burger', 'Pan brioche', 'Picada de vaca', '', 'Salsa chipotle', '', 'Panceta curada de vaca', '', '');

SET @burger_id = LAST_INSERT_ID();

INSERT INTO Burgers_in_restaurant (restaurant_id, burger_id)
VALUES (@restaurant_id, @burger_id);

-- BURGER #3
INSERT INTO Burger (user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture)
VALUES (1, 'Manhattan Burger', 'Pan brioche', 'Picada de vaca', 'Cheddar', '', 'Lechuga, Tomate', 'Bacon natural ahumado', '', '');

SET @burger_id = LAST_INSERT_ID();

INSERT INTO Burgers_in_restaurant (restaurant_id, burger_id)
VALUES (@restaurant_id, @burger_id);



-- FIAMMA BURGER & GRILL
INSERT INTO BurgerRestaurant (restaurant_name, address, phone, website, latitude, longitude)
VALUES ('Fiamma Burger & Grill', 'C. Pedro Antonio de Alarcón, 69, 18003 Granada', 858993289, 'http://fiammaburger.es/', 37.1755222, -3.6080866);

SET @restaurant_id = LAST_INSERT_ID();

-- BURGER #1
INSERT INTO Burger (user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture)
VALUES (1, 'Monster', 'Pan brioche', 'Vaca rubia gallega', 'Monterey jack', 'Salsa secreta', '', 'Bacon', '', '');

SET @burger_id = LAST_INSERT_ID();

INSERT INTO Burgers_in_restaurant (restaurant_id, burger_id)
VALUES (@restaurant_id, @burger_id);


-- BURGER #2
INSERT INTO Burger (user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture)
VALUES (1, 'Muerte por bacon', 'Pan brioche', 'Black Angus', 'Cheddar', 'Mayo Kimchi', 'Cebolla caramelizada', 'Mermelada de bacon', '', '');

SET @burger_id = LAST_INSERT_ID();

INSERT INTO Burgers_in_restaurant (restaurant_id, burger_id)
VALUES (@restaurant_id, @burger_id);


-- BURGER #3
INSERT INTO Burger (user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture)
VALUES (1, 'Emy', 'Pan brioche', 'Vaca rubia gallega', 'Monterey jack', 'Salsa Nguyen', 'Cebolla caramelizada', '', '', '');

SET @burger_id = LAST_INSERT_ID();

INSERT INTO Burgers_in_restaurant (restaurant_id, burger_id)
VALUES (@restaurant_id, @burger_id);



-- LA CALLE BURGER
INSERT INTO BurgerRestaurant (restaurant_name, address, phone, website, latitude, longitude)
VALUES ('La Calle Burger', 'Pl. Albert Einstein, 3, Local 19, 18002 Granada', 958236657, 'https://lacalleburger.com/', 37.1781643, -3.6091643);

SET @restaurant_id = LAST_INSERT_ID();

-- BURGER #1
INSERT INTO Burger (user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture)
VALUES (1, 'Angus LCB', 'Pan brioche', 'Black Angus', 'Semicurado', 'Mayonesa de pimienta y trufa', 'Hoja de roble, Portobello', '', '', '');

SET @burger_id = LAST_INSERT_ID();

INSERT INTO Burgers_in_restaurant (restaurant_id, burger_id)
VALUES (@restaurant_id, @burger_id);


-- BURGER #2
INSERT INTO Burger (user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture)
VALUES (1, 'Angus Manchega', 'Pan brioche', 'Black Angus', 'Semicurado', 'Mayonesa LCB', 'Berenjena, Pimiento rojo, Cebolla', 'Cebolla crujiente', '', '');

SET @burger_id = LAST_INSERT_ID();

INSERT INTO Burgers_in_restaurant (restaurant_id, burger_id)
VALUES (@restaurant_id, @burger_id);


-- BURGER #3
INSERT INTO Burger (user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture)
VALUES (1, 'Costilla', 'Pan brioche', 'Costilla', 'Cheddar', 'Barbacoa', 'Canónigos, Aros de cebolla', '', '', '');

SET @burger_id = LAST_INSERT_ID();

INSERT INTO Burgers_in_restaurant (restaurant_id, burger_id)
VALUES (@restaurant_id, @burger_id);


-- BURGERS USERS FOR TESTING
INSERT INTO Burger (user_id, burger_name, bread_type, meat_type, cheese_type, sauce_type, vegetable_type, toppings_type, description, picture, time_to_prepare, difficulty)
VALUES
(1, 'Clásica', 'Pan de hamburguesa', 'Vacuno', 'Cheddar', 'Mayonesa, Kétchup, Mostaza', 'Lechuga, Tomate, Cebolla', 'Bacon', 'La hamburguesa más clásica de todas, para los amantes de los sabores tradicionales', 'test_01.jpg', 10, 1),
(1, 'Mexicana', 'Pan de semillas', 'Cerdo', 'Manchego', 'Guacamole', 'Lechuga, Tomate, Cebolla', 'Nachos, Bacon', 'Una hamburguesa picante con un toque mexicano', 'test_02.jpg', 15, 2),
(1, 'Vegetal', 'Pan de hamburguesa integral', 'Hamburguesa de soja', 'Cabra', 'Tártara', 'Espinacas, tomate, cebolla', 'Huevo', 'Para los vegetarianos, una opción deliciosa y saludable', 'test_03.jpg', 8, 3),
(2, 'Marrana', 'Pan de hamburguesa', 'Cerdo', 'Cabra', 'Barbacoa', 'Cebolla', 'Bacon', 'Para ver el futbol', 'test_04.jpg', 10, 1);

-- BURGERS RANKING FOR TESTING
INSERT INTO Ranking (user_id, burger_id, rating)
VALUES
(1, 10, 5),(1, 11, 4),(1, 12, 10), (1, 13, 2);