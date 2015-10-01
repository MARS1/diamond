/* Quick-jump reference:
 *
 *  _TRIGGERS
 *  _ROUTES
 *  _JOBS
 *
 */

//=============================================================================
//_TRIGGERS

function redirectHomeNewProperty(context, redirect) {
  //Redirect users back to home if they have ended up half-way through the
  //properties-adding process.
  if ( Meteor.isClient ) {
    if ( Session.get("newProperty") === undefined ) {
      redirect('home');
    }
  }
}

//Property-adding: redirect users home if they jump in half way.
FlowRouter.triggers.enter([redirectHomeNewProperty], {only: ["property.confirm", "property.describe"]});


//=============================================================================
//_ROUTES
//

//
// USERS
//

// 404
FlowRouter.notFound = {
    action: function() {
        FlowLayout.render('Notfound');
    }
};

// HOME
FlowRouter.route('/', {
    subscriptions: function(params, queryParams) {
        this.register('properties', Meteor.subscribe('properties'));
        this.register('jobs', Meteor.subscribe('jobs'));
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutUsers', {top: 'Header' , main: 'DisplayProperties', bottom: 'Footer'});
    },
    name: 'home' //pathFor value
});

//  BIDS RECEIVED
FlowRouter.route('/bid/recieved', {
    subscriptions: function(params, queryParams) {
        // subs
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutUsers' , {top: 'Header' , main: 'BidReceived' , bottom: 'Footer'});
    },
    name: 'bidsReceived' //pathFor value
});

//=============================================================================
//_JOBS

FlowRouter.route("/posts/new/:propertyId/step1-property", {
    subscriptions : function() {
        this.register('jobs', Meteor.subscribe('jobs'));
        this.register('jobs.drafts', Meteor.subscribe('jobs.drafts'));
    },
    action : function() {
        FlowLayout.render('JobLayoutUsers' , {top: 'Header' , main: 'JobProperty' , bottom: 'Footer'});
    },
    name : "job.property"
});


FlowRouter.route("/posts/new/step1-property", {
    subscriptions : function() {
        this.register('jobs', Meteor.subscribe('jobs'));
        this.register('jobs.drafts', Meteor.subscribe('jobs.drafts'));
    },
    action: function(params, queryParams) {
        FlowLayout.render('JobLayoutUsers' , {top: 'Header' , main: 'JobProperty' , bottom: 'Footer'});
    },
    name : "job.property.select"
});

FlowRouter.route("/posts/new/:propertyId/step2-story", {
    subscriptions : function() {
        this.register('jobs', Meteor.subscribe('jobs'));
        this.register('jobs.drafts', Meteor.subscribe('jobs.drafts'));
    },
    action : function(params, queryParams) {
        FlowLayout.render("JobLayoutUsers", {top: 'Header' , main: 'JobStory' , bottom: 'Footer'});
    },
    name : "job.story"
});

FlowRouter.route("/posts/new/:propertyId/step3-contact", {
    subscriptions : function() {
        this.register('jobs', Meteor.subscribe('jobs'));
        this.register('jobs.drafts', Meteor.subscribe('jobs.drafts'));
    },
    action : function() {
        FlowLayout.render("JobLayoutUsers", {top: 'Header' , main: 'JobContact' , bottom: 'Footer'});
    },
    name : "job.contact"
});

FlowRouter.route("/posts/new/:propertyId/step4-access", {
    subscriptions : function() {
        this.register('jobs', Meteor.subscribe('jobs'));
        this.register('jobs.drafts', Meteor.subscribe('jobs.drafts'));
    },
    action : function() {
        FlowLayout.render("JobLayoutUsers", {top: 'Header' , main: 'JobAccess' , bottom: 'Footer'});
    },
    name : "job.access"
});

FlowRouter.route("/posts/new/:propertyId/confirm", {
    subscriptions : function() {
        this.register('jobs', Meteor.subscribe('jobs'));
        this.register('jobs.drafts', Meteor.subscribe('jobs.drafts'));
    },
    action : function() {
        FlowLayout.render("JobLayoutUsers", {top: 'Header' , main: 'JobConfirm' , bottom: 'Footer'});
    },
    name : "job.confirm"
});




// HELP
FlowRouter.route('/help', {
    subscriptions: function(params, queryParams) {
        // subs
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutUsers' , {top: 'Header' , main: 'Help', bottom: 'Footer'});
    },
    name: 'help' //pathFor value
});

// BILLING INFORMATION
FlowRouter.route('/account/billing_information', {
        subscriptions: function(params, queryParams) {
        // this.register('cards', Meteor.subscribe('allCreditCards'));
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutUsers' , {top: 'Header' , main: 'BillingTab' , bottom: 'Footer'});
    },
    name: 'billingTab' //pathFor value
});

FlowRouter.route('/account/billing_information/:cardId', {
        subscriptions: function(params, queryParams) {
        // this.register('card', Meteor.subscribe('singleCard', params.cardId));
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutUsers' , {top: 'Header' , main: 'BillingTab' , bottom: 'Footer'});
    },
    name: 'card' //pathFor value
});

// CONTACT INFORMATION
FlowRouter.route('/account/contact_information', {
    subscriptions: function(params, queryParams) {
        //  subs
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutUsers' , {top: 'Header' , main: 'Account' , bottom: 'Footer'});
    },
    name: 'contactTab' //pathFor value
});

// ABOUT
FlowRouter.route('/about', {
    subscriptions: function(params, queryParams) {
        // subs
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutUsers' , {top: 'Header' , main: 'About' , bottom: 'Footer'});
    },
    name: 'about' //pathFor value
});

// CONTACT
FlowRouter.route('/contact', {
    subscriptions: function(params, queryParams) {
        // subs
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutUsers' , {top: 'Header' , main: 'Contact' , bottom: 'Footer'});
    },
    name: 'contact' //pathFor value
});

// CREATE A PROPERTY - STEP 1
FlowRouter.route('/properties/create/step-1', {
    action: function() {
        FlowLayout.render('MapLayoutUsers', {top: 'Header' , main: 'PropertyCreate1' , bottom: 'Footer'});
    },
    name: 'propStep1' //pathFor value
});

// CREATE A PROPERTY - STEP 2
FlowRouter.route('/properties/create/step-2', {
    action: function() {
        FlowLayout.render('MapLayoutUsers', {top: 'Header' , main: 'PropertyCreate2' , bottom: 'Footer'});
    },
    name: 'propStep2' //pathFor value
});

// CREATE A PROPERTY - STEP 3
FlowRouter.route('/properties/create/step-3', {
    subscriptions: function() {
        // At this point we need to subscribe to Properties
    this.register('properties', Meteor.subscribe('properties'));

    },
    action: function() {
        FlowLayout.render('MasterLayoutUsersFull', {top: 'Header' , main: 'PropertyCreate3' , bottom: 'Footer'});
    },
    name: 'propStep3' //pathFor value
});

//
// ORGANIZATION
//
FlowRouter.route('/organization', {
    subscriptions: function(params, queryParams) {
        // subs
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutOrganization' , {top: 'HeaderOrganization' , main: 'HomeOrganization' , bottom: 'Footer'});
    },
    name: 'organization' //pathFor value
});

// BIDS ACCEPTED
FlowRouter.route('/bid/accepted', {
    subscriptions: function(params, queryParams) {
        // subs
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutOrganization' , {top: 'HeaderOrganization' , main: 'BidAccepted' , bottom: 'Footer'});
    },
    name: 'bidsAccepted' //pathFor value
});

// CLEANINGS NEEDED
FlowRouter.route('/jobs', {
    subscriptions: function(params, queryParams) {
        // subs
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutOrganization', {top: 'HeaderOrganization' , main: 'CleaningNeeded' , bottom: 'Footer'});
    },
    name: 'cleaningsNeeded' //pathFor value
});

// BUSINESS ACCOUNT
FlowRouter.route('/account/business', {
        subscriptions: function(params, queryParams) {
        // subs
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutOrganization' , {top: 'HeaderOrganization' , main: 'BusinessAccount' , bottom: 'Footer'});
    },
    name: 'businessAccount' //pathFor value
});

// BUSINESS SETTINGS
FlowRouter.route('/account/settings', {
        subscriptions: function(params, queryParams) {
        // subs
    },
    action: function(params, queryParams) {
        FlowLayout.render('MasterLayoutOrganization' , {top: 'HeaderOrganization' , main: 'BusinessSettings' , bottom: 'Footer'});
    },
    name: 'businessSettings' //pathFor value
});
