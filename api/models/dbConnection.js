global.mongoose          = require('mongoose');

mongoose.connect("mongodb://asimiec:Waseem12@ds163870.mlab.com:63870/populate")
  .then(connection => {
      console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log(error.message)
  })

mongoose.db  = mongoose.createConnection("mongodb://asimiec:Waseem12@ds163870.mlab.com:63870/populate");
module.exports        = mongoose;
