export default class APIService {
  static GetArticles() {
    return fetch("http://127.0.0.1:8000/api/articles/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
    }).then((resp) => resp.json());
  }

  static GetDemo() {
    return fetch("http://127.0.0.1:8000/api/demo/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization':`Token ${token['mytoken']}`
      },
    }).then((resp) => resp.json());
  }

  // static UpdateArticle(article_id, body, token) {
  //
  //  return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
  //     'method':'PUT',
  //     headers: {
  //         'Content-Type':'application/json',
  //         'Authorization':`Token ${token}`
  //       },
  //       body:JSON.stringify(body)
  //
  //  }).then(resp => resp.json())
  //
  //
  // }
  //
  // static InsertArticle(body, token) {
  //
  //   return fetch('http://127.0.0.1:8000/api/articles/', {
  //     'method':'POST',
  //     headers: {
  //         'Content-Type':'application/json',
  //         'Authorization':`Token ${token}`
  //       },
  //       body:JSON.stringify(body)
  //
  //   }).then(resp => resp.json())
  //
  // }
  //
  // static DeleteArticle(article_id, token) {
  //
  //   return fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
  //     'method':'DELETE',
  //     headers: {
  //         'Content-Type':'application/json',
  //         'Authorization':`Token ${token}`
  //       }
  //
  //  })
  //
  // }
  //
  static LoginUser(body) {
    return fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static RegisterUser(body) {
    return fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static insertUserInterests(body) {
    return fetch("http://127.0.0.1:8000/api/userinterests/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  }

  static getUserObject(token) {
    return fetch(`http://127.0.0.1:8000/api/users/getUserByToken/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ token: token }),
    }).then((resp) => resp.json());
  }
}
