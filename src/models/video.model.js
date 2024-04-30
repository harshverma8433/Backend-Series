import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";// a plugin used for paginating mongodb aggragate queries in mongoose

const videoSchema = new Schema({
    videoFile:{
        type:String , // cloudinary url
        required:true
    },
    thumbnail:{
        type:String, // cloudinary url
        required:true 
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number , // cloudinary url
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
}
)


videoSchema.plugin(mongooseAggregatePaginate); // it add the pagination support to the videoschema . with this plugin we can paginate the results of mongodb aggregate queries perfomed on the video collection

export const Video = mongoose.model("Video",videoSchema)