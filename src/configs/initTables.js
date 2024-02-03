//Moe Myat Thwe 2340362 DIT/FT/1B/05
const pool = require("../services/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);


const SQLSTATEMENT = `  
        DROP TABLE IF EXISTS UserInventory;
        DROP TABLE IF EXISTS UserPoints;
        DROP TABLE IF EXISTS TaskProgress;
        DROP TABLE IF EXISTS MagicalItemShop;      
        DROP TABLE IF EXISTS UserTeam;
        DROP TABLE IF EXISTS Messages;
        DROP TABLE IF EXISTS User;
        DROP TABLE IF EXISTS Task;
        DROP TABLE IF EXISTS Team;  


        CREATE TABLE Task (
            task_id int NOT NULL AUTO_INCREMENT,
            title text,
            description text,
            points int DEFAULT NULL,
            PRIMARY KEY (task_id)
          ) ;

          CREATE TABLE User (
            user_id int NOT NULL AUTO_INCREMENT,
            username text,
            email VARCHAR(40) UNIQUE, 
            password text,
            PRIMARY KEY (user_id)
          )  ;

          CREATE TABLE TaskProgress (
            progress_id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            task_id int NOT NULL,
            completion_date timestamp NULL DEFAULT NULL,
            notes text,
            PRIMARY KEY (progress_id),
            KEY tp_user_id_user_idx (user_id),
            KEY tp_task_id_task_task_id_idx (task_id),
            CONSTRAINT tp_task_id_task_task_id FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT tp_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
          ) ;

          CREATE TABLE UserPoints (
            user_id int NOT NULL,
            total_points int DEFAULT 0,
            PRIMARY KEY (user_id),
            FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE ON UPDATE CASCADE
          );

          CREATE TABLE MagicalItemShop (
            item_id int NOT NULL AUTO_INCREMENT,
            name TEXT,
            description TEXT,
            price INT DEFAULT 0,
            PRIMARY KEY (item_id)
          );

          CREATE TABLE UserInventory (
            inventory_id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            item_id int NOT NULL,
            PRIMARY KEY (inventory_id),
            FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
            FOREIGN KEY (item_id) REFERENCES MagicalItemShop(item_id)
          );
          
          CREATE TABLE Team (
            team_id int PRIMARY KEY,
            team_name VARCHAR(50) NOT NULL
          );

          CREATE TABLE UserTeam (
            user_id int,
            team_id int,
            PRIMARY KEY (user_id, team_id),
            UNIQUE KEY unique_user_team(user_id),
            FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (team_id) REFERENCES Team(team_id) ON DELETE CASCADE ON UPDATE CASCADE
          );

          CREATE TABLE Messages (
            id INT PRIMARY KEY AUTO_INCREMENT,
            message TEXT NOT NULL,
            user_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
         
          INSERT INTO Task VALUES 
          (1,'Plant a Tree','Plant a tree in your neighbourhood or a designated green area.',50),
          (2,'Use Public Transportation','Use public transportation or carpool instead of driving alone.',30),
          (3,'Reduce Plastic Usage ','Commit to using reusable bags and containers. ',40),
          (4,'Energy Conservation','Turn off lights and appliances when not in use. ',25),
          (5,'Composting ','Start composting kitchen scraps to create natural fertilizer.',35);

          INSERT INTO MagicalItemShop (name, description, price)
          VALUES 
            ('Wand of Sparkles', 'A wand that conjures sparkles with a flick.', 20),
            ('Cloak of Invisibility', 'A magical cloak that makes the wearer invisible.', 50),
            ('Potion of Wisdom', 'A potion that temporarily boosts intelligence.', 30),
            ('Enchanted Sword', 'A sword with magical enhancements for better combat.', 40),
            ('Crystal Ball', 'A crystal ball that reveals glimpses of the future.', 60);
          
          INSERT INTO Team (team_id, team_name)
          VALUES
           (1,'Team Phoenix'),
           (2,'Team Legends');

         
          `;
    pool.query(SQLSTATEMENT, callback);
  }
});