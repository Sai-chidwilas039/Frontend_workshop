// Mock data for demonstration
const videos = [
    {
      id: "1",
      title: "Learn JavaScript in 10 Minutes",
      thumbnail: "https://via.placeholder.com/150",
      videoUrl: "https://www.youtube.com/embed/LO5eTH4Pe8E",
    },
    {
      id: "2",
      title: "CSS Crash Course",
      thumbnail: "https://via.placeholder.com/150",
      videoUrl: "https://www.youtube.com/embed/f7ypRyxw6Yw",
    },
    {
      id: "3",
      title: "HTML Basics for Beginners",
      thumbnail: "https://via.placeholder.com/150",
      videoUrl: "https://www.youtube.com/embed/dU1Gr3M2XBI",
    },
    {
      id: "4",
      title: "Using React js creating Quiz app",
      thumbnail: "https://via.placeholder.com/150",
      videoUrl: "https://www.youtube.com/embed/VMZ7lcSdVnY",
    },
  ];
  
  const videoListEl = document.getElementById("video-list");
  const videoPlayerEl = document.getElementById("video-player");
  
  // Function to render video thumbnails
  function renderVideoList() {
    videoListEl.innerHTML = "";
    videos.forEach((video) => {
      const videoItem = document.createElement("div");
      videoItem.classList.add("video-item");
      videoItem.innerHTML = `
        <img src="Youtube_Button.jpg">
        <div class="video-title">${video.title}</div>
      `;
      videoItem.addEventListener("click", () => playVideo(video));
      videoListEl.appendChild(videoItem);
    });
  }
  
  // Function to play video
  function playVideo(video) {
    videoPlayerEl.innerHTML = `
      <iframe 
        width="100%" 
        height="400" 
        src="${video.videoUrl}" 
        frameborder="0" 
        allow="autoplay; encrypted-media" 
        allowfullscreen>
      </iframe>
      <h2>${video.title}</h2>
    `;
  }
  
  // Search functionality
  document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("search").value.toLowerCase();
    const filteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(query)
    );
    videoListEl.innerHTML = "";
    filteredVideos.forEach((video) => {
      const videoItem = document.createElement("div");
      videoItem.classList.add("video-item");
      videoItem.innerHTML = `
        <img src="Youtube_Button.jpg">
        <div class="video-title">${video.title}</div>
      `;
      videoItem.addEventListener("click", () => playVideo(video));
      videoListEl.appendChild(videoItem);
    });
  });
  
  // Initialize app
  renderVideoList();
  