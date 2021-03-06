var integrationHelper = require('../support/integration_helper'),
    request = require('supertest'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    stubs = require('../stubs/index'),
    blueprints = require('../blueprints/index');

chai.should();
chai.use(sinonChai);

describe('Integration: Tag Endpoints', function(){
  var clientStub, app;

  before(function(){
    clientStub = integrationHelper.clientStub;
    var system = integrationHelper.before();
    app = system.app;
    clientStub = system.clientStub;
  });

  after(integrationHelper.after);

  describe('GET /v1/tags', function(){
    afterEach(function(){
      clientStub.list.restore();
    });

    it('return a model collection', function(done){
      sinon.stub(clientStub, 'list')
        .resolves({payload: [stubs.tag]});

      request(app)
        .get('/v1/tags')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect([blueprints.tag])
        .end(done);
    });
  });
});
