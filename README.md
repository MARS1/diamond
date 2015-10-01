#KLENLY PROPERTY ADDING ENGINE
sandbox

KNOWN BUGS in this branch:

  - The "new job" forms look horrible
  - Loading and saving drafts seems to not work on every page after job.property
  - Lots of bugs need to be discovered.

CHANGELOG: Tue Aug 25 04:59:54 UTC 2015

  - Added the new autoform-compatible fields to the templates and commented out
    unused code.  Added collections necessary for saving the job draft.  Kept the
    "job\_management" folder for regression.
  
  - Everything that needed to be imported from the old repo should now be in the
     new files.

  - Also, added a new directory at client/templates/AutoFormFields to house
    custom autoform field types. Currently, this is where property-selector
    resides.


CHANGELOG: Sun Jul 26 10:06:26 UTC 2015

  - Changed iron router to flow router and updated all the bindings.

  - Merged routes "home" and "properties.display" into simply "home". It now
    shows you different views depending on whether you have properties or not
    by utilizing {{#if}}. See ~/client/home/view.html for a reference.

  - To prevent people from jumping in the middle of the property-adding
    pipeline (perhaps by manually entering a URL), I've added a flow-router
    trigger that redirects the user to home when their `Session->newProperty`
    is undefined. I removed the previous controller-level mechanism from the
    codebase.

  - I removed the data params, `lat` and `lon` from the properties.confirm
    route. My decision to do this was based on the following considerations:

    1. If lat and lon are transported in the URL, the URL can be bookmarked,
    and the user would see the home they were entering at the time of creating
    the bookmark, instead of the one they are potentially working on now.

    2. Since I'm already using the session to store the property address, it's
    not a bad idea to keep the latitude and longitude in the same object.

  - I changed the paths so that `property` is now `properties`. This way, you
    can have urls like the following:  

    - `/properties/create` - create a property

    - `/properties/:propertyID` - view a property in detail (maybe property
      history and advanced details)

    - `/properties/update/:propertyID` - update a property

    - `/properties` - view all properties

    Anyway, see how you feel about it. It's not a recommendation, just
    something to try on and see how it fits.

  - I added a notFound template for when people try to access resources that
    don't exist. For an example, visit ~/lib/routes.js

  - I added a unique constraint to "address" in the property collection so that
    the same property cannot be added multiple times. If that is not necessary,
    it's easy enough to remove.  See the simpleschema definition in
    ~/collections.js.
