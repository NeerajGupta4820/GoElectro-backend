import Review from '../Modals/reviewModel.js';

export const createReview = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;
        if (!productId || !userId || !rating || !comment) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }        
        const review = new Review({productId,userId,rating,comment});

        await review.save();
        res.status(201).json({ success: true, review });
    } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const updates = req.body;

        const review = await Review.findByIdAndUpdate(reviewId, updates, { new: true });
        
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        res.status(200).json({ success: true, review });
    } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findByIdAndDelete(reviewId);
        
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getReviewsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId }).populate('userId', 'name'); 
        
        res.status(200).json({ success: true, reviews });
    } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId).populate('userId', 'name');
        
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        res.status(200).json({ success: true, review });
    } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    }
};

export const likeReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);
        
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        review.likes += 1;
        await review.save();

        res.status(200).json({ success: true, review });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const dislikeReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);
        
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        review.dislikes += 1;
        await review.save();

        res.status(200).json({ success: true, review });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};