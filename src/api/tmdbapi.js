import axios from "axios";

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        Authorization:
         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjExY2RmMTUwMjBkNmRjYjQxMGRjMDg2NDE3M2VlOSIsInN1YiI6IjY1MGFlZDU5NmMxOWVhMDBhZGVjOWVmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.to_ZMp9rllhrmPl2w1a74qC4Lw3VQLBtHiy13O_KjOQ'
    }
})