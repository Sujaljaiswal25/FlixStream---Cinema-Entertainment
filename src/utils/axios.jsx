import axios from "axios";


const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWFkMGRhOGRkM2Y4YWFjODA0Zjk5OGUyZDQ0YWViOSIsIm5iZiI6MTcyODgxMjk1Mi44MzQyMjMsInN1YiI6IjY3MGI5MzkyM2JiNDU1N2M2NjliODAwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xjXx3oX-HE7rpjDzT73MbMd5tN2k30RmMHN5TF90Gyo'
      }
});

export default instance;