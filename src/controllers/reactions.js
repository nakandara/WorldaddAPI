
import {incrementReactionCountService} from '../services/reactions.js';




export const incrementReactionCount = async (req, res) => {
    const { postId, reactionType } = req.body;
    console.log(postId, reactionType);

    try {
      const updatedCount = await incrementReactionCountService(postId, reactionType);
      res.status(200).json({ count: updatedCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


