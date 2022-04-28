# reflectionAPI
The reflectionAPI application is used to note and measure a person's achievements.
It is created with nodejs, express, postgress and furnished with authentication and auctions processes by JWT.
Before accessing reflection data, the user must register and login first.
You can use the following endpoint to access the reflectionAPI application.

User:

	Register: /api/v1/user/register  
      user can input email and password
      
 	Login: /api/v1/user/login   
      user can input email and password
      
      
Reflection: 

	getAllreflections: api/v1/reflections/
	get all reflections was created.
	
	postReflections: /api/v1/reflections/   
      user can user can input succes status, low point reflections and take away
	
	deletereflectins: api/v1/reflections/:id  
      user can input the id of the reflections to be deleted. Users can only delete their own reflections.
      
	updateReflections: /api/v1/reflections/:id  
      user can input the id of the reflections to be updated. Users can only update their own reflections.
 
