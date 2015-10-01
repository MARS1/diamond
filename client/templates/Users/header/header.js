Template.Header.events({
    'click #facebook-login': function(e) {
    	Meteor.loginWithFacebook({}, function(err){
    		if(err) {
    			throw new Meteor.Error("Facebook login failed");
    		}
    	});
    },
    'click #logout': function(e) {
    	Meteor.logout(function(err) {
    		if(err) {
    			throw new Meteor.Error('Logout failed');
    		}
    	});
    }
});

Template.Header.helpers({
    routeName: function () {
        return FlowRouter.getRouteName();
    },
    userAvatar: function () {
        if(this.profile) {
            var id = this.profile.facebookId;
            var img = 'http://graph.facebook.com/' + id + '/picture?height=30&width=30';
            return img;
        }
    }
});