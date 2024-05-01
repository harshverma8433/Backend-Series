import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user data from request body
  // validation - not empty
  // check user if already exist or not ( username or email /)
  // check for images , chexk for avatar
  // upload them to cloudinary , avatar
  // create user object - create entry in db
  // remove password and hash token filed from response
  // check for user creation
  // return res

  const { fullname, username, email, password } = req.body;

  if (
    [fullname, username, email.password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User Already registered");
  }

  
  const avatarLocalPath = req.files?.avatar[0]?.path;
  
  if(!avatarLocalPath){
      throw new ApiError(400 , "avatar file is required")
    }

    
    const avatar =  await uploadOnCloudinary(avatarLocalPath);

    if(!avatar){
        throw new ApiError(500 , "failed to upload avatar")
    }


    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    const coverImage =  await uploadOnCloudinary(coverImageLocalPath);
    
    console.log(avatar);
    console.log(coverImage);

  const user = await User.create({
    fullname,
    username : username.toLowerCase(),
    email,
    password,
    avatar:avatar.url,
    coverImage:coverImage?.url || ""
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500 , "Something went wrong while creating the user")
  }

  return res.status(200).json(
    new ApiResponse(200 , createdUser , "User Registered SuccessFully")
  )

});

export default registerUser;
