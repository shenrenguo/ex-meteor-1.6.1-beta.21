import {Meteor} from 'meteor/meteor';
import {JobCollection, Job} from 'meteor/vsivsi:job-collection';

const collectionName = 'jobs';

const jobs = new JobCollection(collectionName, {noCollectionSuffix: true});


if (Meteor.isServer) {
  jobs.allow({
    admin(userId, method, params) {
      return userId;
    }
  });

  Meteor.startup(function () {
    Meteor.publish('allJobs', function () {
      return jobs.find({});
    });

    return jobs.startJobServer();
  });
}

if (Meteor.isClient) {
  Meteor.startup(function () {
    // Normal Meteor subscribe call, to subscribe 'allJobs' publish
    Meteor.subscribe('allJobs');
  });
}

export {jobs};

