// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
    // (1/2) Uncomment the line below to use localStorage
    // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Biệt Tri Kỷ TikTok (Dj Za)",
            singer: "Bie Zhi Ji",
            path: "./assets/music/y2meta.com - Biệt Tri Kỷ TikTok ((别知己)) Dj Za - Bie Zhi Ji _ Nhạc Trung Quốc Hot Tiktok - Biệt Tri Kỷ Thái Lan (128 kbps).mp3",
            image: "./assets/pictures/picture_1.jpg"
        },
        {
            name: "Mưa Tuyết (DN Team Remix)",
            singer: "Jimmii Nguyễn",
            path: "./assets/music/y2meta.com - Mưa Tuyết ( DN Team Remix ) - Jimmii Nguyễn _ Từng Hạt Tuyết Rơi Cho Nơi Đây Anh Lẻ Loi Remix (128 kbps).mp3",
            image:"./assets/pictures/picture_2.jpg"
        },
        {
            name: "Nữ Nhi Tình",
            singer: "DJ Triệu Muzik",
            path:"./assets/music/y2meta.com - Nữ Nhi Tình Remix - Bản Mix Hay Nhất 2020 _ DJ Triệu Muzik _ 49 REMIX TV (128 kbps).mp3",
            image: "./assets/pictures/picture_3.jpg"
        },
        {
            name: "Phụ Tình",
            singer: "DJ DatPro",
            path: "./assets/music/y2meta.com - Phụ Tình Remix - Bản Remix Cực Hay (128 kbps).mp3",
            image: "./assets/pictures/picture_4.jpg"
        },
        {
            name: "SpaceSpeakers",
            singer: "Freaky Squad",
            path: "./assets/music/y2meta.com - SpaceSpeakers - Freaky Squad (Official Music Video) (128 kbps).mp3",
            image: "./assets/pictures/picture_5.jpg"
        },
        {
            name: "Thương Người Không Thương",
            singer: "Phát Huy T4",
            path: "./assets/music/y2meta.com - Thương người không thương … (Phát Huy T4) remix (128 kbps).mp3",
            image: "./assets/pictures/picture_6.jpg"
        },
        {
            name: "Váy Cưới",
            singer: "Trung Tự",
            path: "./assets/music/y2meta.com - Trung Tự - Váy Cưới ( Lofi Ver ) - ( Lyric Video ) - Nhạc Hot TikTok (128 kbps).mp3",
            image: "./assets/pictures/picture_7.jpg"
        },
        {
            name: "Từ Cửu Môn Hồi Ức",
            singer: "DJ DatPro",
            path:"./assets/music/y2meta.com - Từ Cửu Môn Hồi Ức Remix  Chill Ke    NHẠC REMIX HOT TIK TOK 2021 (128 kbps).mp3",
            image: "./assets/pictures/picture_8.jpeg"
        },
        {
            name: "Thiên Đàng",
            singer: "WOWY",
            path:"./assets/music/y2meta.com - WOWY - THIÊN ĐÀNG ft JOLIPOLI ( tại ELLE SHOW ) Full version (128 kbps).mp3",
            image: "./assets/pictures/picture_9.jpg"
        },
        {
            name: "Xin Đừng Nhắc Máy",
            singer: "B Ray x Han Sara",
            path:"./assets/music/y2meta.com - Xin Đừng Nhấc Máy Remix (Bản Chuẩn Trên TikTok) - B RAY x HAN SARA - (Marrk Martinez Remix) (128 kbps).mp3",
            image: "./assets/pictures/picture_10.jpg"
        }

    ],
    setConfig: function (key, value) {
        this.config[key] = value;
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
        return `
            <div class="song ${
            index === this.currentIndex ? "active" : ""
            }" data-index="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `;
        });
        playlist.innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
        get: function () {
            return this.songs[this.currentIndex];
        }
        });
    },
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý CD quay / dừng
        // Handle CD spins / stops
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
        duration: 10000, // 10 seconds
        iterations: Infinity
        });
        cdThumbAnimate.pause();

        // Xử lý phóng to / thu nhỏ CD
        // Handles CD enlargement / reduction
        document.onscroll = function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdWidth - scrollTop;

        cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
        cd.style.opacity = newCdWidth / cdWidth;
        };

        // Xử lý khi click play
        // Handle when click play
        playBtn.onclick = function () {
        if (_this.isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        };

        // Khi song được play
        // When the song is played
        audio.onplay = function () {
        _this.isPlaying = true;
        player.classList.add("playing");
        cdThumbAnimate.play();
        };

        // Khi song bị pause
        // When the song is pause
        audio.onpause = function () {
        _this.isPlaying = false;
        player.classList.remove("playing");
        cdThumbAnimate.pause();
        };

        // Khi tiến độ bài hát thay đổi
        // When the song progress changes
        audio.ontimeupdate = function () {
        if (audio.duration) {
            const progressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
            );
            progress.value = progressPercent;
        }
        };

        // Xử lý khi tua song
        // Handling when seek
        progress.onchange = function (e) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
        };

        // Khi next song
        // When next song
        nextBtn.onclick = function () {
        if (_this.isRandom) {
            _this.playRandomSong();
        } else {
            _this.nextSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
        };

        // Khi prev song
        // When prev song
        prevBtn.onclick = function () {
        if (_this.isRandom) {
            _this.playRandomSong();
        } else {
            _this.prevSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
        };

        // Xử lý bật / tắt random song
        // Handling on / off random song
        randomBtn.onclick = function (e) {
        _this.isRandom = !_this.isRandom;
        _this.setConfig("isRandom", _this.isRandom);
        randomBtn.classList.toggle("active", _this.isRandom);
        };

        // Xử lý lặp lại một song
        // Single-parallel repeat processing
        repeatBtn.onclick = function (e) {
        _this.isRepeat = !_this.isRepeat;
        _this.setConfig("isRepeat", _this.isRepeat);
        repeatBtn.classList.toggle("active", _this.isRepeat);
        };

        // Xử lý next song khi audio ended
        // Handle next song when audio ended
        audio.onended = function () {
        if (_this.isRepeat) {
            audio.play();
        } else {
            nextBtn.click();
        }
        };

        // Lắng nghe hành vi click vào playlist
        // Listen to playlist clicks
        playlist.onclick = function (e) {
        const songNode = e.target.closest(".song:not(.active)");

        if (songNode || e.target.closest(".option")) {
            // Xử lý khi click vào song
            // Handle when clicking on the song
            if (songNode) {
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();
            _this.render();
            audio.play();
            }

            // Xử lý khi click vào song option
            // Handle when clicking on the song option
            if (e.target.closest(".option")) {
            }
        }
        };
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
        $(".song.active").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
        }, 300);
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function () {
        let newIndex;
        do {
        newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        // Assign configuration from config to application
        this.loadConfig();

        // Định nghĩa các thuộc tính cho object
        // Defines properties for the object
        this.defineProperties();

        // Lắng nghe / xử lý các sự kiện (DOM events)
        // Listening / handling events (DOM events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        // Load the first song information into the UI when running the app
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // Hiển thị trạng thái ban đầu của button repeat & random
        // Display the initial state of the repeat & random button
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    }
    };

    app.start();