import LoadMovieJson from './Constants'

export function ProcessGetRequest() { 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const MovieList = LoadMovieJson();
            let response = {};
            if(MovieList !== undefined){
                response.data = MovieList;
                response.status = 200;
                resolve(response);
            }
            else{
                response.data = null;
                response.status = 400;
                reject(Error(response))
            }
            return;
        }, 500);
    })
}

// export function ProcessPutRequest(modItem){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const MovieList = LoadMovieJson();
//             let response;
//             if(MovieList !== undefined){
//                 MovieList.forEach((item, i) => {
//                     if(item.id === modItem.id){
//                         MovieList[i] = modItem;
//                         response.data = modItem;
//                         response.status = 200;
//                         return resolve(response)
//                     }
//                 })
//                 response.data = null;
//                 response.status = 404;
//                 return reject(Error(response));
//             }
//             else{
//                 response.data = null;
//                 response.data = 400;
//                 return reject(Error(response));
//             }
//         }, 3000);
//     })
// }

// export function ProcessPostRequest(item){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const MovieList = LoadMovieJson();
//             let response;
//             if(MovieList !== undefined){
//                 MovieList.push(item)
//                 response.data = MovieList;
//                 response.status = 200;
//                 return resolve(response);
//             }
//             else{
//                 response.data = null;
//                 response.data = 404;
//                 return reject(Error(response));
//             }
//         }, 3000);
//     })
// }

// export function ProcessDeleteRequest(id){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const MovieList = LoadMovieJson();
//             let response;
//             if(MovieList !== undefined){
//                 MovieList.forEach((item, i, object) => {
//                     if(item.id === modItem.id){
//                         object.splice(i, 1)
//                         response.data = MovieList;
//                         response.status = 200;
//                         return resolve(response)
//                     }
//                 })
//                 response.data = null;
//                 response.status = 404;
//                 return reject(Error(response));
//             }
//             else{
//                 response.data = null;
//                 response.data = 400;
//                 return reject(Error(response));
//             }
//         }, 3000);
//     })
// }