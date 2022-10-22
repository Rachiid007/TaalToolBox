// //MIDDLEWARE pour enregistre les images arrivant depuis le frontend
// import multer from "multer"
// const MIME_TYPES = {
//   'image/jpeg': 'jpg',
//   'image/jpg': 'jpg',
//   'image/png': 'png',
// };

// //DISKSTORAGE configure le nom et le chemin des fichiers entrant
// const storage = multer.diskStorage({
//   //NOUS PERMET DE STOCKER LES FICHIERS SUR LE LOCAL FILE SYSTEM ET LE NOM DES FICHIERS ENTRANTS
//   destination: (req, file, callback) => {
//     callback(null, 'images'); // Configuration de la destination des fichiers
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_'); //retirer les " " sur les nom et remplacer par des _
//     const extension = MIME_TYPES[file.mimetype]; //configuration de l'extension en fonction de MIME_TYPES
//     callback(null, name + Date.now() + '.' + extension); //null : pour dire pas d'erreur ,
//   },
// });

// //SINGLE cree un middleware qui capture les fichiers d'un certain type et les enregistres au serveur

// multer({ storage: storage }); //autorise uniquement le téléchargement des fichiers images
const MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
};
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split(' ').join('_');
  const extension = MIME_TYPES[file.mimetype];
  callback(null, `${name}${Date.now()}.${extension}`);
};
