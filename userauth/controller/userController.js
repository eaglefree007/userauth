const userModel = require('../model/userModel')
module.exports={

  getUser: async (req, res) => {
    try {
      let users = await userModel.find({status: 1, role: 0})
      if (users.length > 0){
        return res.send({status: 1, msg: "success", data: users})
      } else {
        return res.send({status: 1, msg: "user not found"})
      }
    } catch (error) {
        return res.send({status: 1, msg: "somthing went wrong"})
    }
  },

  addUser: async (req, res) =>{

    const { name, email, password, contactNumber, about, address, city, state, country, zip } = req.body;
    
    try {
      let datas = {}
      !name ? res.status(200).json({status: 2, msg: "name not found"}) : datas.name = name;
      !email ? res.status(200).json({status: 2, msg: "email not found"}) : datas.emailId = email;
      !contactNumber ? res.status(200).json({status: 2, msg: "contactNumber not found"}) : datas.contactNumber = contactNumber;
      !about ? res.status(200).json({status: 2, msg: "contactNumber not found"}) : datas.about = about;
      !address ? res.status(200).json({status: 2, msg: "address not found"}) : datas.address = address;
      !city ? res.status(200).json({status: 2, msg: "address not found"}) : datas.city = city;
      !state ? res.status(200).json({status: 2, msg: "address not found"}) : datas.state = state;
      !country ? res.status(200).json({status: 2, msg: "address not found"}) : datas.country = country;
      !zip ? res.status(200).json({status: 2, msg: "address not found"}) : datas.zip = zip;
      !password ? res.status(200).json({status: 2, msg: "password not found"}) : datas.password = password;
      // function for reference check 
      isReffered = true;

      isReffered ? datas.isReffered = 0 : datas.isReffered = 1;
      datas.role = 0;
      datas.status = 1;
      datas.createdDate = new Date().valueOf();
      datas.updatedDate = new Date().valueOf();
      
      let userData = await userModel.find({"$or" : [{email}, {contactNumber}]});

      if (!userData) {
        return res.send({status: 4, msg: "user already exist with same mailId / contact"}) 
      } else { 
        await userModel.create(datas)
        return res.send({status: 2, msg: "user added"});
       }

    }
    catch (err) {
        return res.status(400).json({msg: "get user not found", err: err})
    }
  },

  loginUser: async (req, res) => {
    let {email, password} = req.body;

    try {
      if(!email) {
        return res.send({status:1, msg: "success login", token})
      }

      const user = await userModel.find({email})
      if (user){
        if(user.password == password){
          let token=jwt.sign(user, process.env.secreatKet)
          return res.send({status:1, msg: "success login", token})
        }
      }
    } catch (error) {
        return res.send({status:1, msg: "something  went wrong (login)", token})
    }
  },

  getUserById: async (req, res) => {
    try {
      let id = req.params.id;
      let user = req.body.user; 
      let userDetail;
      if(user.role == 1) {
        userDetail = await userModel.findOne({id: id, status: 1 }) 
      }else {
        userDetail = await userModel.findOne({id: id, role: 0, status: 1 }) 
      }
      if (userDetail) {
        return res.send({status: 1, msg: "success", data: userDetail})
      } else {
        return res.send({status:2, msg: " data not found"})
      }
    } catch (error) {
      return res.send({msg: "somthing went wrong", status: 3})
    }
  },

  updateUser: async (req, res) => {
//     let id = req.params.id;
//     let {...data} = req.body
//     !name ? 
// // {
// //   name: 'b',
// //   email: 'b@a.c',
// //   contactNumber: 886010524,
// //   about: 'about not necessary',
// //   address: 'okhla',
// //   city: 'OKHLA',
// //   state: 'delhi',
// //   country: 'India',
// //   zip: 110025,
// //   password: 'asdf1234'
// // }

    // console.log(data, id, 102)
    // try {
    //   let userData = await userModel.findOne({id});
    //   // console.log(userData, 105);
    // } catch (error) {
      
    // }

// {
//   name: 'b',
//   email: 'b@a.c',
//   contactNumber: 886010524,
//   about: 'about not necessary',
//   address: 'okhla',
//   city: 'OKHLA',
//   state: 'delhi',
//   country: 'India',
//   zip: 110025,
//   password: 'asdf1234'
// }
    let id = req.params.id;
    const { name, email, password, contactNumber, about, address, city, state, country, zip } = req.body;
    
    try {
      let datas = {}
      !name ? res.status(200).json({status: 2, msg: "name not found"}) : datas.name = name;
      !email ? res.status(200).json({status: 2, msg: "email not found"}) : datas.emailId = email;
      !contactNumber ? res.status(200).json({status: 2, msg: "contactNumber not found"}) : datas.contactNumber = contactNumber;
      !about ? res.status(200).json({status: 2, msg: "contactNumber not found"}) : datas.about = about;
      !address ? res.status(200).json({status: 2, msg: "address not found"}) : datas.address = address;
      !city ? res.status(200).json({status: 2, msg: "address not found"}) : datas.city = city;
      !state ? res.status(200).json({status: 2, msg: "address not found"}) : datas.state = state;
      !country ? res.status(200).json({status: 2, msg: "address not found"}) : datas.country = country;
      !zip ? res.status(200).json({status: 2, msg: "address not found"}) : datas.zip = zip;
      !password ? res.status(200).json({status: 2, msg: "password not found"}) : datas.password = password;
      // function for reference check 

      datas.updatedDate = new Date().valueOf();
      
      let userData = await userModel.findOneAndUpdate({ id }, {datas});
      console.log(userData, `154 find from model`)
      if (userData) {
        userData.save()
        return res.send({ status: 1, message: "updated successfully 156", id });
      }

      // console.log(datas, `156 collected and maintained in object from req`)

      // if (!userData) {
      //   return res.send({status: 4, msg: "user already exist with same mailId / contact"}) 
      // } else { 
      //   await userModel.create(datas)
      //   return res.send({status: 2, msg: "user added"});
      //  }

    }
    catch (err) {
        return res.status(400).json({msg: "get user not found", err: err})
    }
  }
}