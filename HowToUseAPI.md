# Set up the API in the backend

1. Create a class in models.py
```python
class Demo(models.Model):
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    description = models.TextField()


    def __str__(self):
        return self.name

```

2. Create a class in serializers.py
```python
class DemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demo
        fields = ['id', 'name', 'title', 'description']
```

3. Register the model class in admin.py
```python
@admin.register(Demo)
class DemoModel(admin.ModelAdmin):
    list_filter = ('name','title', 'description')
    list_display = ('name','title', 'description')

```

4. Create a viewset in views.py
```python
class DemoViewSet(viewsets.ModelViewSet):
    queryset = Demo.objects.all()
    serializer_class = DemoSerializer
```

5. In urls.py of api
```python
router.register('demo', DemoViewSet, basename='demo')
```

6. run in cmd
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

7. to check the api working correctly:

```
http://127.0.0.1:8000/api/demo/
```

# Now Fetch Data From Frontend


17. create a APIService.js file and create a class and write methods
```javascript
export default class APIService {


    static GetDemo(){
        return  fetch('http://127.0.0.1:8000/api/demo/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json',
        // 'Authorization':`Token ${token['mytoken']}`
      }
    })
    .then(resp => resp.json())
    }
}
```

18. create a component DemoList.js
```javascript
import React from 'react'

function DemoList(props){

    return(
        <div>
            {props.demos && props.demos.map(demo =>{
                return(
                    <div key={demo.id}>
                        <h1>{demo.name}</h1>
                        <h2>{demo.title}</h2>
                        <p>{demo.description}</p>
                    </div>
                )
            })}
        </div>
    )

}

export default DemoList;

```

19. In app.js file
```javascript
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import ArticleList from './Components/ArticleList';
import DemoList from "./Components/DemoList";
import Hello from "./Components/Hello";
import 'bootstrap/dist/css/bootstrap.min.css';
import APIService from "./APIService";

function App() {
    const [articles, setArticles] = useState([])
    const [demos, setDemos] = useState([])

    useEffect(() => {
        APIService.GetArticles()
            .then(resp => setArticles(resp))
            .catch(error => console.log(error))
  }, [])

    useEffect(()=>{
        APIService.GetDemo()
            .then(resp => setDemos(resp))
            .catch(error => console.log(error))
    },[])


  return (
    <div className="App">
      <Hello/>
        <ArticleList articles={articles}></ArticleList>
        <DemoList demos={demos}/>
    </div>
  );
}

export default App;

```





