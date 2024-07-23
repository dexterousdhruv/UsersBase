const moment = require("moment")
const User = require("../models/userSchema")
const { checkIsEmpty } = require("../utils/helpers")
const csv = require('fast-csv')
const fs = require('node:fs')
const BASE_URL = process.env.BASE_URL

// register user
const userPost = async (req, res) => {
  const userData = req.body
  const { filename } = req.file 
 
  if (checkIsEmpty(userData) || !filename)
    return res.status(406).send('All inputs are required!')

  try {
    const existingEmail = await User.findOne({ email: userData.email })
    const existingMobile = await User.findOne({ mobile: userData.mobile })

    if (existingEmail) 
      return res.status(409).send('User email already exists!')

    if (existingMobile) 
      return res.status(409).send('User phone number already exists!')
  
    const newUser = await User({ ...userData, profile: filename }).save()
    return res.status(201).json(newUser)
      
  } catch (e) {
    return res.status(400).json(e)
  }
 
} 

// get all users
const getAllUsers = async (req, res) => {
  const {
    search = "", gender = "",
    status = "", sort = "", page = 1
   } = req.query 
  
  const ITEM_PER_PAGE =  4
  
  const query = { 
    firstName: { $regex: search, $options: "i"},
  }

  if(gender !== 'All') query.gender = gender
  if (status !== 'All') query.status = status
  
  try {
    const skip = (page - 1) * ITEM_PER_PAGE
    
    const allUsers = await User.find(query)
    .sort({ createdAt: sort === 'new' ? -1 : 1 })
    .limit(ITEM_PER_PAGE)
    .skip(skip)
    
    const count = await User.countDocuments(query) // total users
    const pageCount = Math.ceil(count / ITEM_PER_PAGE)  // total number of pages


    return res.status(200).json({
      pagination: { count, pageCount },
      allUsers
    })

  } catch (e) {
    return res.status(404).json(e)
  }
}

// get existing user
const getUser = async (req, res) => {
  const { params: { _id } } = req
  try {
    const existingUser = await User.findById(_id)
    
    return res.status(200).json(existingUser)
  } catch (e) {
    return res.status(404).json(e)
  }
}   

// update existing user
const updateUser = async (req, res) => {
  const { params: { _id } } = req
  const userData = req.body
  const profile = req.file?.filename ?? userData.profile

  try { 
    const updatedUser = await User.findByIdAndUpdate(_id, { ...userData, profile }, { new: true })

    await updatedUser.save()
    return res.status(200).json(updatedUser)
  } catch (e) {
    return res.status(400).json(e)
  } 
}

// delete existing user
const deleteUser = async (req, res) => {
  const { params: { _id } } = req

  try {
    const deletedUser = await User.findByIdAndDelete(_id)
    return res.status(200).json(deletedUser)

  } catch (e) {
    return res.status(400).json(e)
  }
}

// change user status
const updateStatus = async (req, res) => {
  const  { _id } = req.params 
  const { status } = req.body
 
  try {
    const updatedUserStatus = await User.findByIdAndUpdate(_id, { status }, { new: true })

    await updatedUserStatus.save()
    return res.status(200).json(updatedUserStatus)

  } catch (e) {
    return res.status(400).json(e)
  }
}


//export to csv
const exportUser = async (req, res) => {
  try {
    const usersData = await User.find({})
    const csvStream = csv.format({ headers: true })

    if (!fs.existsSync('public/files/export')) {
      if (!fs.existsSync('public/files')) {
        fs.mkdirSync('public/files')
      }
      fs.mkdirSync('public/files/export')
    }

    const writableStream = fs.createWriteStream('public/files/export/users.csv')

    csvStream.pipe(writableStream)

    writableStream.on('finish', function() {
      res.json({
        downloadUrl: `${BASE_URL}/files/export/users.csv`
      })
    })
 
    usersData.length && usersData.map((user) => {
      csvStream.write({
        FirstName: user.firstName ?? "-",  
        LastName: user.lastName ?? "-",  
        Email: user.email ?? "-",  
        Mobile: user.mobile ?? "-",  
        Gender: user.gender ?? "-",  
        Status: user.status ?? "-",  
        Location: user.location ?? "-",  
        CreatedAt:  moment(user.createdAt).format('DD-MM-YYYY') ?? "-",  
        UpdatedAt: moment(user.updatedAt).format('DD-MM-YYYY') ?? "-",  
         
      })
      
    })
         
    csvStream.end()
    writableStream.end()

  } catch (e) {
    res.status(401).json(e)
  }
}

module.exports = { userPost, getAllUsers, getUser, updateUser, deleteUser, updateStatus, exportUser }
  