Meteor.startup(function() {
    AutoForm.hooks({

        jobPropertyForm: {
            onSubmit: function (insertDoc, updateDoc, currentDoc) {
                console.log("submitting!");
                Session.setPersistent("job:property", insertDoc);
                var success = true;
                if (success) {
                    this.done();
                    FlowRouter.go("job.story", {propertyId:insertDoc.propertyId});
                } else {
                    this.done(new Error("Submission failed"));
                }
                return false;
            }
        },

        jobStoryForm: {
            onSubmit: function (insertDoc, updateDoc, currentDoc) {
                console.log("submitting job story!");
                Session.setPersistent("job:story", insertDoc);
                var success = true;
                if (success) {
                    this.done();
                    var propertyId = FlowRouter.getParam("propertyId");
                    FlowRouter.go("job.contact", {propertyId:propertyId});
                } else {
                    this.done(new Error("Submission failed"));
                }
                return false;
            }
        },

        jobContactForm: {
            onSubmit: function (insertDoc, updateDoc, currentDoc) {
                console.log("submitting job contact!");
                Session.setPersistent("job:contact", insertDoc);
                var success = true;
                if (success) {
                    this.done();
                    var propertyId = FlowRouter.getParam("propertyId");
                    FlowRouter.go("job.access", {propertyId:propertyId});
                } else {
                    this.done(new Error("Submission failed"));
                }
                return false;
            }
        },

        jobAccessForm: {
            onSubmit: function (insertDoc, updateDoc, currentDoc) {
                console.log("submitting job access!");
                Session.setPersistent("job:access", insertDoc);
                var success = true;
                if (success) {
                    this.done();
                    var propertyId = FlowRouter.getParam("propertyId");
                    FlowRouter.go("job.confirm", {propertyId:propertyId});
                } else {
                    this.done(new Error("Submission failed"));
                }
                return false;
            }
        },

        jobConfirmForm : {
            before : {
                insert : function(doc) {
                //insert toastr here
                return doc;
                }
            },
            after : {
                insert : function(err, data) {
                    if ( err ) {
                        bootbox.alert(err+'');
                    } else {
                        bootbox.alert("saved successfully.");
                        FlowRouter.go("home");
                    }
                }
            }
        }
    });
});
