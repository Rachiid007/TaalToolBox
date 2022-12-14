import { apiClient, apiClientForm } from './apiClient'


// const getData = async () => {
//     await axios
//        .get('http://localhost:3000/school', {
//          headers: {
//            'Content-Type': 'application/json',
//            'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
//          }
//        })
//        .then((res) => {
//          let schoolName: any = res.data
//          for (let i in schoolName) {
//            dataSchool.value.push(schoolName[i].name)
//          }
//          console.log(schoolName)
//        })
//    }

 

export default {
  getSchool() {
    return apiClient.get('/school')
  },

  getSchoolClass() {
    return apiClient.get('/schoolClass')
  },

  addClass(name: string, schoolId: number ) {
    return apiClient.post(`/schoolclass`, {
        name : name,
        schoolId : schoolId   
    })
  }
}
   