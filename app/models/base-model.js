import SocketClient from 'socket.io-client';
import Feathers from 'feathers-client';
import Utils from '../lib/Utils';
import _ from 'lodash';

const API_HOST = ''; // use this host!

class BaseModel {
  defaults() { return {}; }

  constructor(resourceName, onError, host = API_HOST) {
    this.utils = new Utils();
    this.socket = new SocketClient(host);
    this.app = Feathers()
      .configure(Feathers.socketio(this.socket))
      .configure(Feathers.hooks())
      .configure(Feathers.authentication({ storage: window.localStorage }));

    this.service = this.app.service(this.utils.pluralize(resourceName));
    this.onChanges = [];
    this.resources = [];

    this.service.find(function(error, resources) {
      if (error) {
        this.onError(error);
      } else {
        this.resources = resources;
        this.inform();
      }
    }.bind(this));

    this.service.on('created', this.createResource.bind(this));
    this.service.on('updated', this.updateResource.bind(this));
    this.service.on('removed', this.removeResource.bind(this));
  }

  authenticate(credentials, success) {
    credentials = _.merge(credentials || {}, {
      type: 'local'
    });

    this.app.authenticate(credentials).then(function(result){
      console.log('Authenticated!', this.app.get('token'));
      success(this.app.get('token'));
    }).catch(function(error){
      console.error('Error authenticating!', error);
      this.onError(error);
    });
  }

  subscribe(onChange) {
    this.onChanges.push(onChange);
  }

  inform() {
    this.onChanges.forEach((cb) => { cb(); });
  }

  getResource() {
    return this.service.get(arguments);
  }

  createResource(resource) {
    this.resources = this.resources.concat(resource);
    this.inform();
  }

  updateResource(resource) {
    this.resources = this.resources.map((current) => {
      return resource._id === current._id ? resource : current;
    });

    this.inform();
  }

  removeResource(resource) {
    this.resources = this.resources.filter((current) => {
      return resource._id !== current._id;
    });

    this.inform();
  }

  addResource(properties = {}) {
    this.service.create(this.utils.extend({}, this.defaults(), properties));
  }

  destroy(resource) {
    this.service.remove(resource._id);
  }

  save(resource, properties) {
    this.service.update(resource._id, this.utils.extend({}, resource, properties));
  }
}

export default BaseModel;
