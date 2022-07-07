# Travello-Project
## Follow this steps to run this Repo
1. Clone this project

## Install Dependencies
Open a terminal
>open a conda environment
```bash
conda create -n django-env
conda activate django-env
```

1. install django
>pip install Django
2. install django rest framework
>		pip install djangorestframework
3. install Pillow
>        pip install Pillow
4. install npm (v14 or higher)
>    https://computingforgeeks.com/install-node-js-14-on-ubuntu-debian-linux/        
5. install react
 >   https://linuxhint.com/install-reactjs-on-ubuntu-20-04/
6. install bootstrap
```bash    
   npm i bootstrap
   npm install react-bootstrap bootstrap 
   ```
7. install django cors headers
>    pip install django-cors-headers
8. install axios
>    npm install axios
9. install react-router-dom
>    npm install react-router-dom
10. Install postgresql
>    link : https://www.postgresql.org/download/linux/ubuntu/

# to install postgresql in ubuntu 20.04:
```bash  
    sudo apt install postgresql 
    sudo -u postgres psql 
    ALTER USER postgres PASSWORD '123456';
    psql -U postgres -h localhost

```
```
    pgadmin:
    email: sayim.hasan30@gmail.com
    pass : 123456

    postgres:
    username : postgres
    pass : 123456
    host : 127.0.0.1
    port : 5432
    database : postgresql

```

download pgadmin for postgresql
>    link : https://www.pgadmin.org/download/

for ubuntu: 
> https://computingforgeeks.com/how-to-install-pgadmin-4-on-ubuntu/

Now setup pgadmin for postgresql


### Run the server

2. Open a terminal
>open a conda environment
```bash
conda activate django-env
```

```bash
cd backend
cd trvello_Project

python manage.py runserver
```

### Run the Frontend

3. Open a terminal
> open a conda environment
```bash
conda create -n react-env
conda activate react-env
```
4. move frontend folder
> move the travello-frontend folder to another location

5. Create a new React app same name as the project frontend folder
```bash
 create-react-app travello-frontend
```
7. now copy all the files and folders from the previously moved travello-frontend folder to 
the newly created travello-frontend folder

8. now install bootstrap
```bash
npm install react-bootstrap bootstrap 
```
9. Now run these project
```bash
npm start
```

