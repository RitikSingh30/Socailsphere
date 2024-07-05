import React, { useState, useEffect } from "react";
import User_image from "../../Asserts/user.png";
import Story from "../../Asserts/story.png";
import Story_image_2 from "../../Asserts/story2.png";

export default function StoriesAndHighlights() {
  const [showModal, setShowModal] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [stories, setStories] = useState([Story, Story_image_2]);
  const [viewOnce, setViewOnce] = useState(true);

  const openModal = () => {
    setShowModal(true);
    setViewOnce(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentStoryIndex(0);
  };

  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setTimeout(() => {
        if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex((prevIndex) => prevIndex + 1);
        } else {
          closeModal();
        }
      }, 6000);
    }
    return () => clearTimeout(timer);
  }, [showModal, currentStoryIndex, stories.length]);

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex space-x-2">
      <img
        className={`rounded-full h-16 w-16 border-2 cursor-pointer ${
          viewOnce ? "border-pink-500" : ""
        }`}
        src={User_image}
        alt="User"
        onClick={openModal}
      />
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        currentStory={stories[currentStoryIndex]}
        nextStory={nextStory}
        prevStory={prevStory}
        hasNext={currentStoryIndex < stories.length - 1}
        hasPrev={currentStoryIndex > 0}
      />
    </div>
  );
}
function Modal({
  showModal,
  closeModal,
  currentStory,
  nextStory,
  prevStory,
  hasNext,
  hasPrev,
}) {
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 h-full flex items-center justify-center z-50">
      <div
        className="p-4 rounded-lg relative max-w-lg h-full w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          &times;
        </button>
        <img
          src={currentStory}
          alt="Story"
          className="w-full h-full rounded-lg"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between px-4">
          {hasPrev && (
            <button
              className="bg-gray-800 bg-opacity-50 text-white rounded-full px-2 py-1"
              onClick={prevStory}
            >
              &lt;
            </button>
          )}
          {hasNext && (
            <button
              className="bg-gray-800 bg-opacity-50 text-white rounded-full px-2 py-1"
              style={{ position: "absolute", right: 0 }}
              onClick={nextStory}
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
