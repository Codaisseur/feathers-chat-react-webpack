import BaseModel from './base-model';

class MessageModel extends BaseModel {
  defaults() {
    return {
      text: null,
      createdAt: Date.now,
      updatedAt: Date.now
    };
  }

  findParams() {
    return {
      query: {
        $sort: { createdAt: 1 },
        $limit: 30
      }
    };
  }

  constructor(app, onError) {
    super(app, 'message', onError);
  }
}

export default MessageModel;
