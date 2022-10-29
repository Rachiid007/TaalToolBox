import cheval from '@/assets/images/card/cheval.svg'
import chien from '@/assets/images/card/chien.svg'
import chat from '@/assets/images/card/chat.svg'
import cochon from '@/assets/images/card/cochon.svg'
import mouton from '@/assets/images/card/mouton.svg'
import canard from '@/assets/images/card/canard.svg'
import lapin from '@/assets/images/card/lapin.svg'
import poulet from '@/assets/images/card/poulet.svg'
import vache from '@/assets/images/card/vache.svg'
import oiseau from '@/assets/images/card/oiseau.svg'
import poisson from '@/assets/images/card/poisson.svg'
import serpent from '@/assets/images/card/serpent.svg'
import lion from '@/assets/images/card/lion.svg'
import tigre from '@/assets/images/card/tigre.svg'
import elephant from '@/assets/images/card/elephant.svg'
import singe from '@/assets/images/card/singe.svg'
import girafe from '@/assets/images/card/girafe.svg'
import zebre from '@/assets/images/card/zebre.svg'
import chevre from '@/assets/images/card/chevre.svg'
import kangourou from '@/assets/images/card/kangourou.svg'
import panda from '@/assets/images/card/panda.svg'
import ours from '@/assets/images/card/ours.svg'
import crocodile from '@/assets/images/card/crocodile.svg'

export const flashcardsData: {
  id: number
  word: string
  translation: string
  image: string
  category: string
}[] = [
  {
    id: 1,
    word: 'Cheval',
    translation: 'Horse',
    image: cheval,
    category: 'animals'
  },
  {
    id: 2,
    word: 'Chien',
    translation: 'Dog',
    image: chien,
    category: 'animals'
  },
  {
    id: 3,
    word: 'Chat',
    translation: 'Cat',
    image: chat,
    category: 'animals'
  },
  {
    id: 4,
    word: 'Cochon',
    translation: 'Pig',
    category: 'animals',
    image: cochon
  },
  {
    id: 5,
    word: 'Mouton',
    translation: 'Sheep',
    category: 'animals',
    image: mouton
  },
  {
    id: 6,
    word: 'Canard',
    translation: 'Duck',
    category: 'animals',
    image: canard
  },
  {
    id: 7,
    word: 'Lapin',
    translation: 'Rabbit',
    category: 'animals',
    image: lapin
  },
  {
    id: 8,
    word: 'Poulet',
    translation: 'Chicken',
    category: 'animals',
    image: poulet
  },
  {
    id: 9,
    word: 'Vache',
    translation: 'Cow',
    category: 'animals',
    image: vache
  },
  {
    id: 10,
    word: 'Oiseau',
    translation: 'Bird',
    category: 'animals',
    image: oiseau
  },
  {
    id: 11,
    word: 'Poisson',
    translation: 'Fish',
    category: 'animals',
    image: poisson
  },
  {
    id: 12,
    word: 'Serpent',
    translation: 'Snake',
    category: 'animals',
    image: serpent
  },
  {
    id: 13,
    word: 'Lion',
    translation: 'Lion',
    category: 'animals',
    image: lion
  },
  {
    id: 14,
    word: 'Tigre',
    translation: 'Tiger',
    category: 'animals',
    image: tigre
  },
  {
    id: 15,
    word: 'Eléphant',
    translation: 'Elephant',
    category: 'animals',
    image: elephant
  },
  {
    id: 16,
    word: 'Singe',
    translation: 'Monkey',
    category: 'animals',
    image: singe
  },
  {
    id: 17,
    word: 'Girafe',
    translation: 'Giraffe',
    category: 'animals',
    image: girafe
  },
  {
    id: 18,
    word: 'Zèbre',
    translation: 'Zebra',
    category: 'animals',
    image: zebre
  },
  {
    id: 19,
    word: 'Chèvre',
    translation: 'Goat',
    category: 'animals',
    image: chevre
  },
  {
    id: 20,
    word: 'Kangourou',
    translation: 'Kangaroo',
    category: 'animals',
    image: kangourou
  },
  {
    id: 21,
    word: 'Panda',
    translation: 'Panda',
    category: 'animals',
    image: panda
  },
  {
    id: 22,
    word: 'Ours',
    translation: 'Bear',
    category: 'animals',
    image: ours
  },
  {
    id: 23,
    word: 'Crocodile',
    translation: 'Crocodile',
    category: 'animals',
    image: crocodile
  }
  // {
  //   id: 24,
  //   word: 'Hippopotame',
  //   translation: 'Hippopotamus',
  //   category: 'animals',
  //   image: hip
  // },
  // {
  //   id: 25,
  //   word: 'Rhinocéros',
  //   translation: 'Rhino',
  //   category: 'animals',
  //   image: 'src/assets/images/card/rhinocéros.svg'
  // }
]
