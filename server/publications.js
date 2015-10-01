Meteor.publish('allCreditCards', function(){
	return Cards.find();
});
Meteor.publish('singleCard', function(){
	return Cards.find({ _id: cardId});
});

Meteor.publish("properties", function() {
  //todo add user filter
  return Properties.find({});
});

Meteor.publish("jobs", function() {
  //todo add user filter
  return Jobs.find({});
});

Meteor.publish("jobs.drafts", function() {
  //todo add user filter
  return Jobs.Drafts.find();
});
