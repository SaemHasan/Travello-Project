Step 1: Create a virtual environment using conda.

> link : https://linuxize.com/post/how-to-install-anaconda-on-ubuntu-20-04/

open the virtual environment

==============================================================================

Step 2: Install the dependencies.

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
>    npm i bootstrap
7. install django cors headers
>    pip install django-cors-headers
8. install axios
>    npm install axios
9. install react-router-dom
>    npm install react-router-dom
10. Install postgresql
>    link : https://www.postgresql.org/download/linux/ubuntu/

# worked for me in ubuntu 20.04:
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


=====================================================================================

Step 3: Create a Django project 

1. Open a Django project in pycharm
   to check if the project is installed and running
   on cmd run ==>
```bash
        python manage.py runserver
```

=====================================================================================

Step 4: Setup postgres in django project

1. create a database in postgresql using pgadmin
 I have created a database named 'travello'

2. setup in settings.py in django project

```python

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'travello',
        'USER': 'postgres',
        'PASSWORD': '123456',
        'HOST' : '127.0.0.1'
    }
}
```

3. install psycopg2
   >sudo pip install psycopg2    

4. run these commands 
```bash
    python manage.py makemigrations
    python manage.py migrate
```
6. to create an admin
    >python manage.py createsuperuser
```    
username: admin
password: admin
```

now you can see the database in the browser

> http://localhost:8000/admin

you can also see the database in the pgadmin
    
> http://127.0.0.1/pgadmin4/browser/

=================================================================================





