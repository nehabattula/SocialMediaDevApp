import Mongoose from "mongoose";
//schema for maps
const MapSchema = new Mongoose.Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number] }
    }
});
MapSchema.index({ location: "2dsphere" });
const Map = Mongoose.model('map', MapSchema);
export default Map;