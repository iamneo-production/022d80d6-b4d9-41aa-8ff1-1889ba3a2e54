import axios from "axios";

const baseURL = "https://ide-cdccbbbcebfdafbfacaacbdbbcffbcddcfcbbceff.project.examly.io/proxy/8080"

export default axios.create({
    baseURL:baseURL,
    headers:{
        "Content-Type":"application/json"
    }
})