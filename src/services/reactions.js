// services/reactions.js


import Reaction from '../models/reaction.js';

export const incrementReactionCountService = async (postId, reactionType) => {
    console.log(reactionType);
    const existingReaction = await Reaction.findOne({ postId, type: reactionType });
    if (existingReaction) {
        throw new Error('You have already reacted to this post.');
      }
    
   
    // Create a new reaction
    const newReaction = new Reaction({ postId, type: reactionType });
    await newReaction.save();
  
    // Get the updated count for the specific reaction type
    const updatedCount = await Reaction.countDocuments({ postId, type: reactionType });
  
    return updatedCount;
};
