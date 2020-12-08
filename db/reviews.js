const { client } = required('./index');

async function createReview({title, content, stars, userId, productId}) {
    try {
        const { rows: [ review ] } = await client.query (`
            INSERT INTO reviews(title, content, stars, "userId", "productId")
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `, [title, content, stars, userId, productId]
        );
      return review;
    } catch (error) {
      throw error;
    }
}

async function getAllReviews() {
    try {
        const { rows: reviews } = await client.query(`
        SELECT *
        FROM reviews
        `);
      return reviews;
    } catch (error) {
      throw error;
    }
}

async function getReviewById(reviewId) {
    try {
        const { rows: [ review ] } = await client.query(`
            SELECT *
            FROM reviews
            WHERE id=$1;
        `, [reviewId]);
      return review;
    } catch (error) {
      throw error;
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById
}