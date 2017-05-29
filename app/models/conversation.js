const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({
    participants: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

mongoose.model('Conversation', ConversationSchema);
