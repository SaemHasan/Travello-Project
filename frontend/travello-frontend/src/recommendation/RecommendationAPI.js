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

    static getTopVisitedSpots(token){
        return fetch(`http://127.0.0.1:8000/api/spots/getTopVisitedSpots/`, {
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

    static getFoodsFromSpotIDs(spot_ids){
        return fetch(`http://127.0.0.1:8000/api/spots/getFoodsFromSpotIDs/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Token ${token}`,
              },
              body: JSON.stringify({ spot_ids : spot_ids }),
            }).then((resp) => resp.json());
    }

    static async getUserInterests(token) {
        return await fetch(`http://127.0.0.1:8000/api/users/getUserInterests/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Token ${token}`,
            },
            body: JSON.stringify({token: token}),
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