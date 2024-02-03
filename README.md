
# Project theme: Eco-Warriors
In this engaging and magical eco-friendly game, users take on the role of Green Warriors dedicated to saving the environment through completing tasks and making environmentally friendly choices. The game adds an element of magic to keep users entertained and motivated. Users can join one of two teams, Team 1 or Team 2, each with a unique identity and purpose.

## Prerequisites

Before diving into the magical world of Eco-Warriors, make sure you have the following dependencies installed:

    Node.js
    npm (Node Package Manager)

## Setting Up Environment Variables

To set up environment variables for your Express.js application, follow these steps:

    Create a file named .env in the root directory of your project.

    Open the .env file and add the following lines:

    DB_HOST=<your_database_host>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_DATABASE=<your_database_name>

    Replace <your_database_host>, <your_database_user>, <your_database_password>, and <your_database_name> with the appropriate values for your database connection.

For example:

DB_HOST=localhost
DB_USER=myuser
DB_PASSWORD=mypassword
DB_DATABASE=pokemon

Note: Make sure there are no spaces around the equal sign (=) in each line.

## Install Dependencies

    Open the terminal in VSCode by going to View > Terminal or using the shortcut `Ctrl + ``.

    Navigate to the project root directory.

    Install the required dependencies using npm:

    npm install

## Database Initialization

    Make sure you have a MySQL database available for the mock test. Update the database configuration details in the .env file.

    To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

    npm run init_tables

## Commit and Sync Changes

    Open the Source Control view in VSCode by clicking on the "Source Control" icon in the left sidebar.

    Review the changes you made to the files.

    Enter a commit message summarizing your changes in the input field at the top of the Source Control view.

    Click on "Commit" to commit the changes.

    Click on "Sync" to push your changes to the remote repository.

    Note: Make sure you have the necessary permissions to push changes to the repository.

## Section B Mechanics

# Teams

    Users can choose to join either Team 1 or Team 2 but not both.
    Team members are not required to be equal in number, allowing flexibility in team composition.

# Points and Items,Magicalshop,User Inventory

    After completing tasks, users gain points.
    Users can spend points to buy magical items.
    Points are deducted upon item purchase.
    If points are insufficient, users cannot buy the desired item.
    Users can buy the same item repeatedly.
    The game displays the quantity of each item owned by a user.   

# Leaderboard   
    The leaderboard showcases both teams, presenting the average completed tasks and average items each team possesses.  

## CA1 SecA + SecB Endpoints

User Endpoints (userRoutes.js)

    GET http://localhost:3000/users/:user_id
        Description: Read user information by user_id.
        Middleware Usage: userController.readUserById (Q3)

    GET http://localhost:3000/users
        Description: Read all users.
        Middleware Usage: userController.readAllUser (Q2)

    GET http://localhost:3000/users/user_inventory/:user_id
        Description: Read each user's item possession.
        Middleware Usage: userController.readUserItemById (Section B view each user item possession)

    GET http://localhost:3000/users/user_inventory
        Description: Read all user item possessions.
        Middleware Usage: userController.readAllUserItem (Section B view all user item possession)

    POST http://localhost:3000/users
        Description: Add a new user.
        Middleware Usage: userController.checkDuplication, userController.createNewUser, userController.createUserPoints, userController.selectUserById (Q1)

    POST http://localhost:3000/users/user_team
        Description: Add a user to a team.
        Middleware Usage: userController.ValidateUserInTeam, userController.ValidateUserTeamExistence, userController.addUserToTeam, userController.getUserTeamInfo (Section B add team)

    PUT http://localhost:3000/users/:user_id
        Description: Update user information by user_id.
        Middleware Usage: userController.checkAvailability, userController.updateUserById (Q4)

    DELETE http://localhost:3000/users/:user_id
        Description: Delete user by user_id.
        Middleware Usage: userController.deleteUserById (Q5)

Task Endpoints (taskRoutes.js)

    POST http://localhost:3000/tasks
        Description: Create a new task.
        Middleware Usage: taskController.createNewTask (Q6)

    GET http://localhost:3000/tasks
        Description: Read all tasks.
        Middleware Usage: taskController.readAllTasks (Q7)

    GET http://localhost:3000/tasks/:task_id
        Description: Read task by task_id.
        Middleware Usage: taskController.readTaskById (Q8)

    PUT http://localhost:3000/tasks/:task_id
        Description: Update task by task_id.
        Middleware Usage: taskController.updateTaskById (Q9)

    DELETE http://localhost:3000/tasks/:task_id
        Description: Delete task by task_id.
        Middleware Usage: taskController.deleteTaskById (Q10)

Task Progress Endpoints (taskprogressRoutes.js)

    POST http://localhost:3000/task_progress
        Description: Create new task progress.
        Middleware Usage: taskprogressController.createNewTaskprogress, taskprogressController.createTaskProgressUserPoints, taskprogressController.selectProgressByIdPointsUser (Q11)

    GET http://localhost:3000/task_progress/:progress_id
        Description: Read task progress by progress_id.
        Middleware Usage: taskprogressController.ReadTaskprogressById (Q12)

    PUT http://localhost:3000/task_progress/:progress_id
        Description: Update task progress by progress_id.
        Middleware Usage: taskprogressController.updateTaskprogressById (Q13)

    DELETE http://localhost:3000/task_progress/:progress_id
        Description: Delete task progress by progress_id.
        Middleware Usage: taskprogressController.deleteTaskprogressById (Q13)

Magical Item Shop Endpoints (magicalitemshopRoutes.js)

    POST http://localhost:3000/magical_item_shop/:user_id
        Description: Purchase magical items from the shop.
        Middleware Usage: magicalitemshopController.ValidateUserItemExistence, magicalitemshopController.checkUserPoints, magicalitemshopController.checkItemPrice, magicalitemshopController.deductPoints, magicalitemshopController.addToUserInventory

    GET http://localhost:3000/magical_item_shop
        Description: Read all magical items in the shop.
        Middleware Usage: magicalitemshopController.ReadAllMagicalitem

Team Endpoints (teamRoutes.js)

    GET http://localhost:3000/team/team_leaderboard
        Description: Read team leaderboard.
        Middleware Usage: teamController.getTeamLeaderboard
    GET http://localhost:3000/team/:team_id


## Folder Structure
>src
  >configs
    initTables.js
  >controllers
    magicalitemshopController.js
    taskController.js
    taskprogressController.js
    teamController.js
    userController.js
  >models
    magicalitemshopModel.js
    taskModel.js
    taskprogressModel.js
    teamModel.js
    userModel.js
  >routes
    magicalitemshopRoutes.js
    mainRoutes.js
    taskprogressRoutes.js
    taskRoutes.js
    teamRoutes.js
    userRoutes.js
  >services
    db.js  


## CA1 Section B Endpoints

POST http://localhost:3000/users  (add user)
POST http://localhost:3000/task_progress (complete task)
GET http://localhost:3000/users/:user_id (can check total points)
GET http://localhost:3000/magical_item_shop (can check what items are in shop)
POST http://localhost:3000/magical_item_shop/user_id (can buy item..a user can buy more than one item and can buy the same item again)
GET http://localhost:3000/users/user_inventory (can view all user item possession,(which item and quantity) )
GET http://localhost:3000/users/user_inventory/user_id (can view each user_id item possession)
POST http://localhost:3000/users/user_team (can add user into team, but a user cannot enter the same team again and again,two teams don't need to have equal members)
GET http://localhost:3000/team/:team_id (can view team members by team_id)
GET http://localhost:3000/team/team_leaderboard(show avg_completed_tasks and avd items in each team)

## middleware usage

router.post('/', userController.checkDuplication,
    userController.createNewUser,
    userController.createUserPoints,
    userController.selectUserById);//Q1

router.post('/user_team', userController.ValidateUserInTeam,
    userController.ValidateUserTeamExistence,
    userController.addUserToTeam,
    userController.getUserTeamInfo);//sec B add team  

router.put('/:user_id', userController.checkAvailability,
    userController.updateUserById);//Q4    

router.post('/', taskprogressController.createNewTaskprogress,
    taskprogressController.createTaskProgressUserPoints,
    taskprogressController.selectProgressByIdPointsUser);//Q11

router.post('/:user_id',
    magicalitemshopController.ValidateUserItemExistence,
    magicalitemshopController.checkUserPoints,
    magicalitemshopController.checkItemPrice,
    magicalitemshopController.deductPoints,
    magicalitemshopController.addToUserInventory);

## CA2 explanation

CA2 have 
Home
Users
Tasks
Item
Message


Before Register and log in,user cannot see certain content...for eg Users,existing tasks,existing items,and won't be able to successfully interact with 



