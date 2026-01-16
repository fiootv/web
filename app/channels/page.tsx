"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Loader2, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Channel {
  channel_number: string;
  title: string;
  genre: string;
  category: string;
}

interface ChannelData {
  channels: Record<string, Channel[]>;
  total: number;
}

export default function ChannelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [channelData, setChannelData] = useState<ChannelData>({ channels: {}, total: 0 });
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch all categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch channels from API
  useEffect(() => {
    fetchChannels();
  }, []);

  // Refresh data when window gains focus (in case data was synced in another tab)
  useEffect(() => {
    const handleFocus = () => {
      fetchChannels();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const response = await fetch(`/api/categories`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data.categories || []);
      
      // Auto-select first category if none selected
      if (!selectedCategory && data.categories && data.categories.length > 0) {
        setSelectedCategory(data.categories[0]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback to categories from channel data
      if (Object.keys(channelData.channels).length > 0) {
        setCategories(Object.keys(channelData.channels).sort());
      }
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const fetchChannels = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/channels`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch channels');
      }

      const data: ChannelData = await response.json();
      console.log('Fetched channel data:', {
        total: data.total,
        categoryCount: Object.keys(data.channels).length,
        categories: Object.keys(data.channels).slice(0, 5),
      });
      setChannelData(data);
    } catch (err) {
      console.error('Error fetching channels:', err);
      setError(err instanceof Error ? err.message : 'Failed to load channels');
    } finally {
      setIsLoading(false);
    }
  };

  // Get channels grouped by category for "ALL CHANNELS" or single category
  const displayedChannelsByCategory = useMemo(() => {
    if (!selectedCategory) {
      return {};
    }

    const result: Record<string, Channel[]> = {};

    if (selectedCategory === 'ALL CHANNELS') {
      // Group all channels by category, maintaining the category order from categories array
      categories.forEach(category => {
        if (category !== 'ALL CHANNELS' && channelData.channels[category] && channelData.channels[category].length > 0) {
          result[category] = [...channelData.channels[category]];
        }
      });
    } else {
      // Single category - check if it exists in channelData
      // Try exact match first
      if (channelData.channels[selectedCategory]) {
        result[selectedCategory] = [...channelData.channels[selectedCategory]];
      } else {
        // Try case-insensitive match as fallback
        const matchingCategory = Object.keys(channelData.channels).find(
          cat => cat.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (matchingCategory) {
          result[selectedCategory] = [...channelData.channels[matchingCategory]];
        } else {
          // Log for debugging
          console.log(`Category "${selectedCategory}" not found. Available categories:`, 
            Object.keys(channelData.channels).slice(0, 10));
        }
      }
    }

    // Filter by search query and sort within each category
    Object.keys(result).forEach(category => {
      let channels = result[category];

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        channels = channels.filter((channel) =>
          channel.genre.toLowerCase().includes(query) ||
          channel.channel_number.toLowerCase().includes(query) ||
          channel.title.toLowerCase().includes(query) ||
          channel.category.toLowerCase().includes(query)
        );
      }

      // Sort by channel number for consistency
      channels.sort((a, b) => {
        const numA = parseInt(a.channel_number) || 0;
        const numB = parseInt(b.channel_number) || 0;
        return numA - numB;
      });

      result[category] = channels;
      
      // Remove empty categories after filtering
      if (channels.length === 0) {
        delete result[category];
      }
    });

    return result;
  }, [selectedCategory, channelData.channels, searchQuery, categories]);

  // Flatten for single category display (non-ALL CHANNELS)
  const displayedChannels = useMemo(() => {
    if (selectedCategory === 'ALL CHANNELS') {
      return [];
    }
    return displayedChannelsByCategory[selectedCategory || ''] || [];
  }, [selectedCategory, displayedChannelsByCategory]);

  return (
    <main className="bg-white h-screen text-gray-900 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex flex-col md:flex-row h-full pt-32">
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-50">
          <h1 className="text-xl font-bold text-gray-900">Channels</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Left Sidebar - Categories */}
        <div className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-80 bg-gray-50 border-r border-gray-200 flex flex-col fixed md:relative z-40 h-screen md:h-full top-0 md:top-auto left-0 md:left-auto`}>
          <div className="p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 hidden md:block">Channels</h1>
            <h2 className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">Channel Categories</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto pt-16 md:pt-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 min-h-0">
            {isLoadingCategories ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="p-8 text-red-600 text-sm">
                <p>{error}</p>
                <button
                  onClick={() => {
                    fetchCategories();
                    fetchChannels();
                  }}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="py-2 h-[calc(100vh-10rem)] overflow-y-auto">
                {categories.length > 0 ? (
                  categories.map((category) => {
                    const isSelected = selectedCategory === category;
                    let channelCount = 0;
                    
                    if (category === 'ALL CHANNELS') {
                      // Count all channels from all categories
                      channelCount = Object.values(channelData.channels).reduce(
                        (sum, channels) => sum + channels.length,
                        0
                      );
                    } else {
                      channelCount = channelData.channels[category]?.length || 0;
                    }
                    
                    const hasChannels = channelCount > 0;
                    
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsMobileMenuOpen(false); // Close mobile menu on selection
                        }}
                        className={`w-full text-left px-4 md:px-6 py-2 md:py-3 transition-colors text-sm md:text-base ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{category}</span>
                          {hasChannels && (
                            <span className={`text-xs ${
                              isSelected ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              ({channelCount})
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-gray-500 text-sm text-center">
                    No categories found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Content Area - Channels Table */}
        <div className="flex-1 flex flex-col bg-white w-full md:w-auto h-full overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 mb-2">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search channels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      // Search is already reactive via searchQuery state
                      // This ensures the input is focused and search is active
                      e.currentTarget.blur();
                    }
                  }}
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-primary"
                />
              </div>
              <Button
                onClick={() => {
                  // Search is already active via searchQuery state
                  // This button provides visual feedback
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input) {
                    input.focus();
                  }
                }}
                variant="default"
                size="sm"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
            {selectedCategory && (
              <div className="text-xs text-gray-500 mt-2 break-words">
                {selectedCategory === 'ALL CHANNELS' ? (
                  <>Total channels: {channelData.total} | Categories with data: {Object.keys(channelData.channels).length}</>
                ) : (
                  <>
                    Selected: {selectedCategory} | 
                    Channels in DB: {channelData.channels[selectedCategory]?.length || 0} | 
                    Available categories: {Object.keys(channelData.channels).length}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Channels Table */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
                  <p className="text-gray-600">Loading channels...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-red-600 text-lg mb-4">Error loading channels</p>
                  <p className="text-gray-600 text-sm mb-4">{error}</p>
                  <button
                    onClick={fetchChannels}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : !selectedCategory ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-600">Select a category to view channels</p>
              </div>
            ) : selectedCategory === 'ALL CHANNELS' ? (
              // Show channels grouped by category for ALL CHANNELS, maintaining category order
              <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                {Object.keys(displayedChannelsByCategory).length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-600">
                      {searchQuery ? 'No channels found matching your search' : 'No channels found'}
                    </p>
                  </div>
                ) : (
                  // Iterate through categories in order to maintain the priority sorting
                  categories
                    .filter(category => category !== 'ALL CHANNELS' && displayedChannelsByCategory[category])
                    .map((category) => {
                      const channels = displayedChannelsByCategory[category];
                      if (!channels || channels.length === 0) return null;
                      
                      return (
                        <div key={category} className="space-y-3 md:space-y-4">
                          <h3 className="text-base md:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 break-words">
                            {category} ({channels.length} channels)
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                            <thead>
                              <tr className="bg-primary text-white">
                                <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">NUMBER</th>
                                <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">GENRE</th>
                                <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">CHANNEL NAME</th>
                              </tr>
                            </thead>
                            <tbody>
                              {channels.map((channel, index) => (
                                <tr
                                  key={`${category}-${channel.channel_number}-${channel.genre}-${index}`}
                                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                  <td className="px-2 md:px-4 py-2 md:py-3 text-gray-700 text-xs md:text-sm">{channel.channel_number}</td>
                                  <td className="px-2 md:px-4 py-2 md:py-3 text-gray-600 text-xs md:text-sm break-words">{channel.title}</td>
                                  <td className="px-2 md:px-4 py-2 md:py-3 text-gray-900 font-medium text-xs md:text-sm break-words">{channel.genre}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            ) : displayedChannels.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">
                    {searchQuery 
                      ? 'No channels found matching your search' 
                      : channelData.channels[selectedCategory || '']
                        ? 'No channels found in this category'
                        : 'No channels synced for this category yet. Use the sync page to fetch channels.'}
                  </p>
                  {!channelData.channels[selectedCategory || ''] && (
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-500 text-xs">
                        Available categories with data: {Object.keys(channelData.channels).length}
                      </p>
                      <a 
                        href="/sync" 
                        className="text-primary hover:underline text-sm inline-block"
                      >
                        Go to Sync Page
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 md:p-6">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">NUMBER</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">GENRE</th>
                        <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">CHANNEL NAME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedChannels.map((channel, index) => (
                        <tr
                          key={`${channel.channel_number}-${channel.genre}-${index}`}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-2 md:px-4 py-2 md:py-3 text-gray-700 text-xs md:text-sm">{channel.channel_number}</td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-gray-600 text-xs md:text-sm break-words">{channel.title}</td>
                          <td className="px-2 md:px-4 py-2 md:py-3 text-gray-900 font-medium text-xs md:text-sm break-words">{channel.genre}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
