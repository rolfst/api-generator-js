var chai = require('chai');
    should = chai.should();

describe('paths', function(){
  var target, metadata;

  beforeEach(function(){
    metadata = require('./metadata/index');
    target = require('../lib/paths')({ metadata: metadata });
  });

  describe('#collection', function(){
    it('should return a pluralized collection path', function(){
      target.collection(metadata.v1.task).should.be.eql('/v1/tasks');
    });

    it('should return a pluralized lower case collection path', function(){
      target.collection(metadata.v1.userAssignment).should.be.eql('/v1/userassignments');
    });

    it('should return a prefixed collection path', function(){
      target.collection(metadata.v1.claim).should.be.eql('/v1/admin/claims');
    });

    it('should return a collection path specified by model', function(){
      target.collection(metadata.v1.me).should.be.eql('/v1/me');
    });
  });

  describe('#resource', function(){
    it('should return a resource path', function(){
      target.resource(metadata.v1.task).should.be.eql('/v1/tasks/:id');
    });

    it('should return a prefixed resource path', function(){
      target.resource(metadata.v1.claim).should.be.eql('/v1/admin/claims/:id');
    });

    it('should return a resource path without identifier', function(){
      target.resource(metadata.v1.me).should.be.eql('/v1/me');
    });
  });

  describe('#resourceRelation', function(){
    it('should return a relation resource path', function(){
      var relation = metadata.v1.task.relations[0];
      target.resourceRelation(relation).should.be.eql('/v1/users/:id');
    });

    it('should return a relation collection path', function(){
      var relation = metadata.v1.user.relations[0];
      target.resourceRelation(relation).should.be.eql('/v1/users/:id/tasks');
    });

    it('should return a relation collection path in lower case', function(){
      var relation = metadata.v1.user.relations[1];
      target.resourceRelation(relation).should.be.eql('/v1/users/:id/userassignments');
    });

    it('should return a relation collection path without identifier', function(){
      var relation = metadata.v1.me.relations[0];
      target.resourceRelation(relation).should.be.eql('/v1/me/alerts');
    });
  });

  describe('#nonStandardAction', function(){
    it('should return a non standard action path', function(){
      var action = metadata.v1.user.actions[1];
      target.nonStandardAction(metadata.v1.user, action)
        .should.be.eql('/v1/users/:id/active');
    });
  });

  describe('with parent relation', function () {
    it('should return a pluralized parent collection path', function(){
      target.collection(metadata.v1.role)
        .should.be.eql('/v1/users/:userId/roles');
    });

    it('should return a resource path', function(){
      target.resource(metadata.v1.role)
        .should.be.eql('/v1/users/:userId/roles/:id');
    });
  });

});
