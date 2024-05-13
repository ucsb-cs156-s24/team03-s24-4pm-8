const menuItemReviewFixtures = {
    oneReview: {
        "id": 1,
        "itemId": 7,
        "reviewerEmail": "cgaucho@ucsb.edu",
        "stars": 5,
        "dateReviewed": "2022-01-03T00:00:00",
        "comments": "Delicious."
    },
    threeReviews: [
        {
            "id": 1,
            "itemId": 7,
            "reviewerEmail": "cgaucho@ucsb.edu",
            "stars": 5,
            "dateReviewed": "2022-01-03T00:00:00",
            "comments": "Delicious."
        },
        {
            "id": 2,
            "itemId": 7,
            "reviewerEmail": "ldelplaya@ucsb.edu",
            "stars": 0,
            "dateReviewed": "2022-03-11T00:00:00",
            "comments": "I hate the pie.."
        },
        {
            "id": 3,
            "itemId": 4,
            "reviewerEmail": "person@ucsb.edu",
            "stars": 3,
            "dateReviewed": "2022-01-11T00:00:00",
            "comments": "Meh. Just average."
        }
    ]
};

export { menuItemReviewFixtures };