import React, { useState } from 'react';
import { Camera, MapPin, Hash, Send, X, Image as ImageIcon } from 'lucide-react';

interface PostCreationProps {
  onPostCreate: (post: any) => void;
  onClose: () => void;
}

const PostCreation: React.FC<PostCreationProps> = ({ onPostCreate, onClose }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const popularLocations = [
    'Alleppey Backwaters', 'Munnar Hill Station', 'Kochi Fort', 'Kovalam Beach',
    'Thekkady Wildlife', 'Wayanad Forests', 'Varkala Cliffs', 'Kumarakom Lake'
  ];

  const suggestedTags = [
    '#Kerala', '#GodsOwnCountry', '#Backwaters', '#HillStation', '#Beach',
    '#Wildlife', '#Culture', '#Food', '#Ayurveda', '#Spices', '#Monsoon', '#Houseboat'
  ];

  // Mock images for demo
  const sampleImages = [
    'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 5) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!description.trim() || !location.trim() || !selectedImage) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        description: description.trim(),
        location: location.trim(),
        tags,
        image: selectedImage,
        author: 'Current User',
        authorAvatar: '👤',
        createdAt: new Date(),
        likes: 0,
        comments: [],
        isLiked: false
      };

      onPostCreate(newPost);
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create New Post</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Image Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4 inline mr-1" />
              Select Image *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sampleImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === image ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Option ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === image && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your experience... What made this place special?"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {description.length}/500
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where was this photo taken?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              list="locations"
            />
            <datalist id="locations">
              {popularLocations.map((loc, index) => (
                <option key={index} value={loc} />
              ))}
            </datalist>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Hash className="w-4 h-4 inline mr-1" />
              Tags (Optional)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add a tag..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                maxLength={20}
              />
              <button
                onClick={handleAddTag}
                disabled={!currentTag.trim() || tags.length >= 5}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestedTags.slice(0, 6).map((tag, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!tags.includes(tag) && tags.length < 5) {
                      setTags([...tags, tag]);
                    }
                  }}
                  disabled={tags.includes(tag) || tags.length >= 5}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {tag}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Maximum 5 tags</p>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!description.trim() || !location.trim() || !selectedImage || isSubmitting}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Share Post
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCreation;