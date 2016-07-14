import SocketClient from 'socket.io-client';
import Feathers from 'feathers-client';
import Utils from '../lib/utils';
import _ from 'lodash';

class BaseModel {
  defaults() { return {}; }

  constructor(app, resourceName, onError) {
    this.app = app;
    this.utils = new Utils();
    this.service = this.app.service(this.utils.pluralize(resourceName));
    this.onChanges = [];
    this.resources = [];

    this.service.find((error, resources) => {
      if (error) {
        console.error(error);
      } else {
        this.resources = resources.data;
        this.inform();
      }
    });

    this.service.on('created', this.createResource.bind(this));
    this.service.on('updated', this.updateResource.bind(this));
    this.service.on('removed', this.removeResource.bind(this));
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
