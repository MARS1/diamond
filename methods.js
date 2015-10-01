Meteor.methods({
    saveJobDraft : function(saveObj) {
        //TODO - scalability
        //make this async with wrapAsync:
        return Jobs.Drafts.upsert({propertyId:saveObj.propertyId}, {$set:saveObj});
    },
    removeJobDraft : function(propertyId) {
        //TODO - scalability
        //make this async with wrapAsync:
        return Jobs.Drafts.remove({propertyId:propertyId});
    },
});
