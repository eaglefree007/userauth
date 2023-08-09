const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  let token = req.headers.authorization

  !token 
  ? res.send({status: 2, msg: "token not found"}) 
  : token = token.split(" ")


  !token.length > 0 
  ? res.send({status: 2, msg: "invalid token"})
  : user = await jwt.verify(token, process.env.secreatKey)

  !user 
  ? res.send({status: 2, msg: "user not verified with token"})
  : res.send({status: 2, msg: "user verified with token"})

}


// ///////////////////////////////////////////////
// if (!token) {
  //   return res.send({status: 2, msg: "token not found"})
  // }
  // token = token.split(" ")
  // if (!token.length > 0){
  //   res.send({status: 2, msg: "invalid token"})
  // }
  // let user = await jwt.verify(token, process.env.secreatKey)
  // if (!user){
  //   return res.send({status: 2, msg: "user not varified with token"})
  // }
  // res.send({status: 2, msg: "user verified with token"})