//  1 - Create Collection

Properties = new Mongo.Collection("properties");

Properties.allow({
  insert : function() {
    return true;
  },

  update : function() {
    return true;
  },

  remove : function() {
    return true;
  }

});

// 2 - Create Schema

Schema.Property = new SimpleSchema({
    address: {
        type: String,
        label: "Address",
        index: true,
        unique: true
    },
    coverPhoto: {
        type: String,
        optional: true
    },
    typeOfProp: {
        type: String,
        label: "Property"
    },
    noBedrooms: {
        type: Number,
        label: "Bedrooms",
        min: 1
    },
    noBathrooms: {
        type: Number,
        label: "Bathrooms",
        min: 1
    },
    sqFeet: {
        type: Number,
        label: "Sq Ft",
        min: 100
    },
    levels: {
        type: Number,
        label: "Levels",
        min: 1
    }
});

// 3 Associate Schema to Collection

Properties.attachSchema(Schema.Property);
