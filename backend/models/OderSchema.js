import mongoose from "mongoose"

const {Schema} = mongoose;

const OderSchema = new Schema({
  email:{
    type:String,
    unique:true,
    require:true
  },
  order_data:{
    type:Array,
    require:true
  }
})

export default mongoose.model("Order", OderSchema);