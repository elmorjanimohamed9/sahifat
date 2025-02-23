import React from 'react';
// Import the Navbar component
import { Navbar } from '../components/Layouts/MainHeader';
import { Hero } from '../components/Hero';
import FeaturedBooks from '../components/FeaturedBooks';
import LatestBooks from '../components/LatestBooks';
import BookCategories from '../components/BookCategories';
import ReadingStats from '../components/ReadingStats';
import ReadingChallenges from '../components/ReadingChallenges';
import CommunityNewsletter from '../components/CommunityNewsletter';
import ReadingJourney from '../components/ReadingJourney';

const Home = () => {
    return (
        <div className='bg-amber-50 dark:bg-amber-950/30'>
            <Navbar />

            <main>
                <Hero />
                <BookCategories />
                <FeaturedBooks />
                <LatestBooks />
                <ReadingJourney />
                <ReadingStats />
                <ReadingChallenges />
                <CommunityNewsletter />
            </main>
        </div>
    );
};

export default Home;