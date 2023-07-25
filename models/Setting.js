let mongoose = require("mongoose");

const SettingSchema = mongoose.Schema({
  company_percentage: {
    type: Number,
    default: 0
  },
});

mongoose.models = {};

let Setting = mongoose.model('setting', SettingSchema);

export default Setting;