import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, MapPin, Calendar, Award, Plus, Filter, Search } from 'lucide-react';
import PostCreation from './PostCreation';

interface Post {
  id: number;
  description: string;
  location: string;
  tags: string[];
  image: string;
  author: string;
  authorAvatar: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  createdAt: Date;
}

interface PostFeedProps {
  onRewardEarned: (coins: number, reason: string) => void;
}

const mockPosts: Post[] = [
  {
    id: 1,
    description: "Amazing sunrise at Munnar tea gardens! The mist rolling over the hills was absolutely breathtaking. Kerala truly is God's own country! 🌅",
    location: "Munnar Hill Station",
    tags: ["#Kerala", "#Munnar", "#Sunrise", "#TeaGardens"],
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Rahul Sharma",
    authorAvatar: "👨‍💼",
    createdAt: new Date(2024, 0, 10, 6, 30),
    likes: 156,
    comments: [
      {
        id: 1,
        author: "Priya",
        authorAvatar: "👩",
        content: "Wow! This is absolutely stunning! 😍",
        createdAt: new Date(2024, 0, 10, 7, 0)
      }
    ],
    isLiked: false
  },
  {
    id: 2,
    description: "Peaceful houseboat experience in Alleppey backwaters. Floating through the serene waters with coconut palms on both sides was pure magic! 🛶",
    location: "Alleppey Backwaters",
    tags: ["#Alleppey", "#Backwaters", "#Houseboat", "#Peace"],
    image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Meera Nair",
    authorAvatar: "👩‍🎓",
    createdAt: new Date(2024, 0, 9, 16, 45),
    likes: 89,
    comments: [],
    isLiked: true
  },
  {
    id: 3,
    description: "Traditional Kerala Sadhya feast! 21 different dishes served on a banana leaf. Each curry had its own unique flavor profile. Food heaven! 🍛",
    location: "Kochi Traditional Restaurant",
    tags: ["#Sadhya", "#Food", "#Traditional", "#BananaLeaf"],
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Arjun Pillai",
    authorAvatar: "👨‍🍳",
    createdAt: new Date(2024, 0, 8, 13, 20),
    likes: 234,
    comments: [
      {
        id: 2,
        author: "Kavya",
        authorAvatar: "👩‍🦱",
        content: "Making me hungry! 🤤",
        createdAt: new Date(2024, 0, 8, 14, 0)
      },
      {
        id: 3,
        author: "Ravi",
        authorAvatar: "👨",
        content: "Nothing beats authentic Kerala cuisine!",
        createdAt: new Date(2024, 0, 8, 15, 30)
      }
    ],
    isLiked: false
  }
];

const PostFeed: React.FC<PostFeedProps> = ({ onRewardEarned }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).slice(0, 8);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !filterTag || post.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const wasLiked = post.isLiked;
        const newPost = {
          ...post,
          isLiked: !wasLiked,
          likes: wasLiked ? post.likes - 1 : post.likes + 1
        };
        
        // Check if post reached 100 likes milestone
        if (!wasLiked && newPost.likes === 100) {
          onRewardEarned(20, `Your post "${post.description.substring(0, 30)}..." reached 100 likes!`);
        }
        
        return newPost;
      }
      return post;
    }));
  };

  const handleAddComment = (postId: number) => {
    const commentText = newComment[postId]?.trim();
    if (!commentText) return;

    const comment: Comment = {
      id: Date.now(),
      author: "You",
      authorAvatar: "👤",
      content: commentText,
      createdAt: new Date()
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));

    setNewComment({ ...newComment, [postId]: '' });
  };

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    onRewardEarned(10, 'Post created successfully!');
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Community Posts</h3>
          <button
            onClick={() => setShowCreatePost(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts or locations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterTag('')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                !filterTag ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilterTag(filterTag === tag ? '' : tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filterTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="divide-y">
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No posts found matching your criteria.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className="p-4">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{post.authorAvatar}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{post.author}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span className="mr-2">{post.location}</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{formatTimeAgo(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
                {post.likes >= 100 && (
                  <Award className="w-5 h-5 text-yellow-500" title="Popular Post" />
                )}
              </div>

              {/* Post Image */}
              <div className="mb-3">
                <img
                  src={post.image}
                  alt={post.description}
                  className="w-full rounded-lg object-cover max-h-96"
                />
              </div>

              {/* Post Content */}
              <div className="mb-3">
                <p className="text-gray-800 mb-2">{post.description}</p>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm"
                      onClick={() => setFilterTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between border-t pt-3">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    onClick={() => setShowComments({ ...showComments, [post.id]: !showComments[post.id] })}
                    className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-3 mb-4">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="flex items-start space-x-3">
                        <span className="text-xl">{comment.authorAvatar}</span>
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-lg p-3">
                            <p className="font-semibold text-sm text-gray-800">{comment.author}</p>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(comment.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <span className="text-xl">👤</span>
                    <div className="flex-1 flex space-x-2">
                      <input
                        type="text"
                        value={newComment[post.id] || ''}
                        onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                        placeholder="Write a comment..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!newComment[post.id]?.trim()}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <PostCreation
          onPostCreate={handleCreatePost}
          onClose={() => setShowCreatePost(false)}
        />
      )}
    </div>
  );
};

export default PostFeed;