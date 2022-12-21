const debug = (str: any) => {
  if (process.env.SET_DEBUG === 'true') {
    console.log(str);
  }
};

export default debug;
