import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import school from '@/services/school'

interface objectClass {
    id: number
    name: string
}

interface objectSchoolClass {
  nameClass: string
  idSchool: number
}



export const useSchoolsStore = defineStore('school', () => {
    const schoolList = ref<objectClass[]>([])

    const schoolClassList = ref<objectSchoolClass[]>([])

    const getSchoolName = async () => {
        const schoolRequest = await school.getSchool()
        const schoolData = schoolRequest.data
        // console.log(schoolData)
        for (let i in schoolData){
            schoolList.value.push({id: schoolData[i].id, name: schoolData[i].name})    
        }
      }

    const getSchoolClass = async () => {
        const schoolClassRequest = await school.getSchoolClass()
        const schoolClassData = schoolClassRequest.data
        // console.log(schoolClassData)
        for (let i in schoolClassData){
            schoolClassList.value.push({nameClass: schoolClassData[i].name, idSchool: schoolClassData[i].schoolId})    
        }
      }  
    
    
    
    // const addClass =  async (name: string, ) => {
    //     const classRequest = school.addClass()
    //     const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ title: "Vue POST Request Example" })
    //       };
    //     fetch("http://localhost:3000/schoolclass", requestOptions)
    //       .then(response => response.json())
    //       .then(data => (this.postId = data.))
    //   }
    
      
      console.log(schoolList.value)
     
    return { schoolClassList, schoolList, getSchoolName, getSchoolClass }
})

