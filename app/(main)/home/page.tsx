
"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FiTrash, FiHeart, FiTwitter } from 'react-icons/fi';

const Home = () => {
  const [tweetContent, setTweetContent] = useState<string>('');
  const [tweets, setTweets] = useState<{ id: number; content: string; timestamp: string }[]>([]);

  const handleTweetChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetContent(event.target.value);
  };

  const handleTweetSubmit = () => {
    if (tweetContent.trim() !== '') {
      // Add the new tweet to the array of tweets
      const newTweet = {
        id: tweets.length + 1,
        content: tweetContent,
        timestamp: new Date().toISOString(), // Convert Date object to string
      };
      setTweets([...tweets, newTweet]);
      // Clear the textarea after submitting the tweet
      setTweetContent('');
    }
  };

  const handleDeleteTweet = (index: number) => {
    // Remove the tweet from the array of tweets
    const updatedTweets = [...tweets];
    updatedTweets.splice(index, 1);
    setTweets(updatedTweets);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4 space-y-6">
      {/* Tweet Input Section */}
      <div className="w-full bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <textarea
            placeholder="Enter tweet"
            value={tweetContent}
            onChange={handleTweetChange}
            className="w-full p-2 border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
          <Button
            onClick={handleTweetSubmit}
            className="flex items-center text-white bg-blue-800 py-2 px-4 rounded-md hover:bg-blue-900"
          >
            Tweet
            <FiTwitter className="ml-2 text-xl" /> {/* Twitter icon */}
          </Button>
        </div>
      </div>

      {/* Display Submitted Tweets Section */}
      <div className="w-full bg-white p-4 rounded-lg shadow-md space-y-4">
        {/* Map through the array of tweets and display each tweet */}
        {tweets.map((tweet, index) => (
          <div key={index} className="flex justify-between">
            <div>
              <p>{tweet.content}</p>
              <p className="text-gray-500 text-sm">{tweet.timestamp}</p>
            </div>
            <div className="flex items-center space-x-4">
              <FiHeart className="text-pink-500 cursor-pointer" />
              <FiTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteTweet(index)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;