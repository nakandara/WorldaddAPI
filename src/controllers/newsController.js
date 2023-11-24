import News from '../models/newsModel.js';

export const createNews = async (req, res) => {
  if (!req.files || !req.files.image || !req.files.pdf) {
    return res.status(400).json({ message: 'Both image and PDF files are required' });
  }

  const { name, email } = req.body;
  const image = req.files.image[0].filename;
  const pdf = req.files.pdf[0].filename;

  const news = new News({ name, email, image, pdf });

  try {
    await news.save();
    res.status(200).json({ success: true, message: 'News created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getNews = async(req, res) => {
    try {
        const newsList = await News.find();
        const newsWithImageUrls = newsList.map((news) => ({
          _id: news._id,
          name: news.name,
          email: news.email,
          imageUrl: `${req.protocol}://${req.get('host')}/uploads/${news.image}`,
          pdfUrl:`${req.protocol}://${req.get('host')}/uploads/${news.pdf}` // Construct the image URL
        }));
    
        res.status(200).json({ success: true, news: newsWithImageUrls });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
  };