CREATE TABLE profile (
    username        VARCHAR(50) PRIMARY KEY,
    password        VARCHAR(200) NOT NULL,
    is_chef         CHAR(1) NOT NULL CHECK (is_chef IN ('Y','N'))
);

CREATE TABLE chef (
    username        VARCHAR(50) PRIMARY KEY,
    avg_rating      NUMERIC(3,2),
    description     VARCHAR(500),

    CONSTRAINT fk_chef_profile
        FOREIGN KEY (username) REFERENCES profile(username),
    
    CONSTRAINT chk_rating_range
        CHECK (avg_rating BETWEEN 0 AND 5)
);

CREATE TABLE bookings (
    booking_id      SERIAL PRIMARY KEY,

    booker_username VARCHAR(50) NOT NULL,
    chef_username   VARCHAR(50) NOT NULL,
    booking_date    DATE NOT NULL,

    status          VARCHAR(20) DEFAULT 'PENDING'
                    CHECK (status IN ('PENDING', 'ACCEPTED', 'COMPLETED')),

    CONSTRAINT fk_booker_profile
        FOREIGN KEY (booker_username) REFERENCES profile(username),

    CONSTRAINT fk_chef_profile_book
        FOREIGN KEY (chef_username) REFERENCES chef(username)
);

CREATE TABLE reviews (
    review_id           SERIAL PRIMARY KEY,

    booking_id          INTEGER NOT NULL,
    chef_username       VARCHAR(50) NOT NULL,
    reviewer_username   VARCHAR(50) NOT NULL,

    rating              NUMERIC(3,2) NOT NULL CHECK (rating BETWEEN 0 AND 5),
    review_text         VARCHAR(1000),

    CONSTRAINT fk_review_booking
        FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),

    CONSTRAINT fk_review_chef
        FOREIGN KEY (chef_username) REFERENCES chef(username),

    CONSTRAINT fk_review_reviewer
        FOREIGN KEY (reviewer_username) REFERENCES profile(username),

    CONSTRAINT unique_booking_review UNIQUE (booking_id)
);