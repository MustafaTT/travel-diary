- Welcome to simple Travel Diary web application with Django-Angular and SpringBoot Logger

	  * Follow the instructions below to run project .

- To start django API install virtual envioriment with "py -m venv venv" inside Backend folder,
	run  "venv\Scripts\activate" command then locate djproject 
	run "pip install -r requirements.txt"
	and run "py.exe .\manage.py runserver" from command prompt.  

          * django runs on localhost:8000

	  * Django uses postgresql But you can change it from inside djproject\djproject\settings.py or use sql table that I created
	    or you could create your own database and adjust connection settings then run "py.exe .\manage.py makemigrations". "py.exe .\manage.py migrate" commands.

	  * To Use default database create database named 'traveldiary' with pgAdmin and choose restore then select file inside DatabaseBackup folder.

          * USERS
	  *admin username :admin password:admin123 email:admin@admin.com
	  *username :user1 password:usertest  email:user1@gmail.com
	  *username :user2 password:usertest  email:user2@gmail.com
	  *username :user3 password:usertest  email:user3@gmail.com

- To start kafka for logging of viewed travels open command prompt inside Kafka folder 

    	* run "bin/windows/zookeeper-server-start.bat config/zookeeper.properties"  command to start zookeeper server 

	* Zookeper running on localhost:2181  

        * You can change the port from inside zookeeper.properties and make sure you changed zookeeper.connect value inside server.properties too. 

	* Then run "bin/windows/kafka-server-start.bat config/server.properties"  commad to start kafka server. 

	* Kafka running on localhost:9092 if your bootstrap servers running on different port change the value of LOGPIPE properties inside djproject\djproject\settings.py

	* and Spring boot application.properties inside src/main/resources

- To start logging user viewed travels log to localstorage run java SpringBoot application.Log files location : "TravelViewLogs"

- Angular running on localhost:4200  if you change it make sure you add the url of angular inside djproject\djproject\settings.py CORS_ORIGIN_WHITELIST

	* You can start angular project form  frontend/travel-diary folder.
	* Make sure your django host url is same with "Frontend\travel-diary\src\app\common\global-constants.ts" apiUrl value

			
