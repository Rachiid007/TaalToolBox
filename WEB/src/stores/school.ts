import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import school from '@/services/school'

interface objectClass {
    id: number
    name: string
}

export const useSchoolsStore = defineStore('school', () => {
    const schoolList = ref<objectClass[]>([])

    const getSchoolName = async () => {
        const schoolRequest = await school.getSchool()
        const schoolData = schoolRequest.data
        console.log(schoolData)
        for (let i in schoolData){
            schoolList.value.push({id: schoolData[i].id, name: schoolData[i].name})    
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
     
    return { schoolList, getSchoolName }
})

