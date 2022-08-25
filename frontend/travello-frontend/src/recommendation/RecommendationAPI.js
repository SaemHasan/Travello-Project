export default class RecommendationAPI{
    static getRecommendationByUserVisitedSpot(token){
        return fetch(`http://127.0.0.1:8000/api/spots/getRecommendationByUserVisitedSpot/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Token ${token}`,
              },
              body: JSON.stringify({ token : token }),
            }).then((resp) => resp.json());
    }

    static getUserVisitedSpots(token){
        return fetch(`http://127.0.0.1:8000/api/spots/getUserVisitedSpots/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Token ${token}`,
              },
              body: JSON.stringify({ token : token }),
            }).then((resp) => resp.json());
    }

    static getUserInterests(token){
        return fetch(`http://127.0.0.1:8000/api/users/getUserInterests/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Token ${token}`,
              },
              body: JSON.stringify({ token : token }),
            }).then((resp) => resp.json());
    }

    static getRecommendatioByUserInterest(token, interests){
        return fetch(`http://127.0.0.1:8000/api/spots/getRecommendatioByUserInterest/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Token ${token}`,
              },
              body: JSON.stringify({ token : token, interests : interests}),
            }).then((resp) => resp.json());
    }
}