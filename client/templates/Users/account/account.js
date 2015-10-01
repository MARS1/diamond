if(Meteor.isClient) {

	Template.Account.helpers({
		activeIfTemplateIs: function(template) {
			var currentRoute = Router.current();
			return currentRoute &&
				template === currentRoute.lookupTemplate() ? 'active' : '';
		}
	});

}