import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import Dadleveldata from '@/types/Dadleveldata'

export const useDadLevels = defineStore('dadlevels', () => {
  const levelSelector = ref(0)
  const levelData = ref<any[]>([])
  levelData.value.push(
    {
      fields: [
        {
          test: '1',
          number: 1,
          top: '15%',
          left: '6%',
          width: '10%',
          height: '4%',
          rightValue: 'Naam'
        },
        {
          test: '2',
          number: 2,
          top: '20%',
          left: '31%',
          width: '20%',
          height: '4%',
          rightValue: 'test@gmail.com'
        },
        {
          test: '3',
          number: 3,
          top: '25%',
          left: '31%',
          width: '15%',
          height: '4%',
          rightValue: '488 04 05 06'
        },
        {
          test: '4',
          number: 4,
          top: '31%',
          left: '6%',
          width: '15%',
          height: '4%',
          rightValue: 'Adres'
        },
        {
          test: '5',
          number: 5,
          top: '36%',
          left: '6%',
          width: '15%',
          height: '4%',
          rightValue: 'Geboortedatum'
        },
        {
          test: '6',
          number: 6,
          top: '6%',
          left: '6%',
          width: '20%',
          height: '5%',
          rightValue: 'Personalia'
        },
        {
          test: '7',
          number: 7,
          top: '72%',
          left: '6%',
          width: '18%',
          height: '5%',
          rightValue: 'Opleidingen'
        }
      ],
      backImage: '/src/assets/images/form4.png'
    },
    {
      fields: [
        {
          test: '1',
          number: 1,
          top: '2%',
          left: '6%',
          width: '70%',
          height: '8%',
          rightValue: 'Curriculum Vitae'
        },
        {
          test: '2',
          number: 2,
          top: '22%',
          left: '7%',
          width: '60%',
          height: '7%',
          rightValue: 'Persoonsgegevens'
        },
        {
          test: '3',
          number: 3,
          top: '74%',
          left: '6%',
          width: '50%',
          height: '8%',
          rightValue: 'Werkervaring'
        }
      ],
      backImage: '/src/assets/images/form2mobile.png'
    }
  )
  const addData = (data: any) => {
    levelData.value.push(data)
  }
  const getData = () => {
    return levelData.value
  }
  const setLevel = (level: number) => {
    levelSelector.value = level
  }
  const getLevel = () => {
    return levelSelector.value
  }
  return { levelData, addData, getData, setLevel, getLevel }
})
