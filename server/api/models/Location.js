import Mongoose from "mongoose";
const Schema = Mongoose.Schema;
 //schema for location 
const LocationSchema = new Mongoose.Schema({

  
    location: {
        address: { type: String, required: true },
        loc: {
            type: { type: String, default: "Point" },
            coordinates: { 
            type: [Number]
            }
        },

      
    }

});
LocationSchema.index({loc: '2dsphere'});

const Location = Mongoose.model('location', LocationSchema);
export default Location;