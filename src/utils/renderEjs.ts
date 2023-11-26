const ejs = require("ejs");


exports.renderEjs = async (filename, data, options) => {
 const ejsString = await new Promise((resolve, reject) => {
    ejs.renderFile(filename, data, options, function(err, str){
      return err ? reject(err) : resolve(str)
    })
  })
  return ejsString
}