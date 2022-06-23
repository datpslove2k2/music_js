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
            name: "Chân Tình",
            singer: "Quốc Duy If Thái Engg Cover",
            path: "./assets/music/y2meta.com - Chân Tình Remix _ Quốc Duy If Thái Engg Cover _ Nhạc Hot Tiktok - Dân Bay Plus (128 kbps).mp3",
            image: "./assets/pictures/picture_1.jpg"
        },
        {
            name: "Ép Duyên",
            singer: "Long Nón Lá",
            path: "./assets/music/y2meta.com - ÉP DUYÊN - YUNIBOO ft NAM ANH _ LONG NÓN LÁ ft KAYDEE COVER (128 kbps).mp3",
            image:"./assets/pictures/picture_10.png"
        },
        {
            name: "Cổ Tích",
            singer: "Jsol",
            path:"./assets/music/y2meta.com - Cổ Tích - JSOL「Cukak Remix」_ Audio Lyrics Video (128 kbps).mp3",
            image: "./assets/pictures/picture_11.jpg"
        },
        {
            name: "Hai Năm Nghĩa Vụ",
            singer: "Bộ Đội",
            path: "./assets/music/y2meta.com - Hai Năm Nghĩa Vụ Remix Vòng Xe Lăn Bánh Chào Tạm Biệt Em Remix _ Nhạc Hot TikTok _ (128 kbps).mp3",
            image: "./assets/pictures/picture_12.jpg"
        },
        {
            name: "Phận Duyên Lỡ Làng",
            singer: "Datpro",
            path: "./assets/music/y2mate.com - Em Như Hoa Dịu Dàng Nồng Nàn  Phận Duyên Lỡ Làng Remix  Nhạc Hot Tik Tok 2021.mp3",
            image: "./assets/pictures/picture_13.jpg"
        },
        {
            name: "Tình Đơn Phương 3",
            singer: "Hi Anh Trai",
            path: "./assets/music/y2mate.com - TÌNH ĐƠN PHƯƠNG 3 Hianhtrai  Remix.mp3",
            image: "./assets/pictures/picture_14.jpg"
        },
        {
            name: "Tan Trong Mưa Bay",
            singer: "Nightcore HN",
            path: "./assets/music/y2meta.com - [ Nightcore HN ] - Nightcore Tan Trong Mưa Bay Remix (128 kbps).mp3",
            image: "./assets/pictures/picture_15.jpg"
        },
        {
            name: "Nhìn Em Lần Cuối",
            singer: "DJ Tit",
            path:"./assets/music/y2meta.com - [Nightcore] - Nhìn Em Lần Cuối (DJ Tit Remix) -  Yuki Huy Nam (128 kbps).mp3",
            image: "./assets/pictures/picture_16.jpg"
        },
        {
            name: "Biết Đau Nhưng Vẫn Yêu",
            singer: "Hồ Gia Khánh",
            path:"./assets/music/y2meta.com - Biết Đau Nhưng Vẫn Yêu Remix  - Hồ Gia Khánh [ Audio MP3] (128 kbps).mp3",
            image: "./assets/pictures/picture_17.jpg"
        },
        {
            name: "Hơn Cả Mây Trời",
            singer: "Tipo",
            path:"./assets/music/y2meta.com - HƠN CẢ MÂY TRỜI REMIX _ TIPO REMIX - Như Việt _ Nhiều hơn cả mây trời, cả cuộc đời... (128 kbps).mp3",
            image: "./assets/pictures/picture_18.jpg"
        },
        {
            name: "Lovely Dog",
            singer: "Toàn Mùi",
            path:"./assets/music/y2meta.com - Lovely Dog Remix TikTok (ARS Remix) - Nhạc Toàn Mùi MIKENCO - MIKENCO Trend Remix (128 kbps).mp3",
            image: "./assets/pictures/picture_19.jpg"
        },   
        {
            name: "Mộng Tàn Hoa",
            singer: "Thiên Tú",
            path:"./assets/music/y2meta.com - Mộng Tàn Hoa (H2O Remix) - Thiên Tú _ Cành hồng đã úa giấc mơ cũng dần tan Hot TikTok Remix (128 kbps).mp3",
            image: "./assets/pictures/picture_2.jpg"
        },   
        {
            name: "Tiếng Hét Nghĩa Tình",
            singer: "Nhạc Chế",
            path:"./assets/music/y2meta.com - Nhạc Chế - TIẾNG HÉT NGHĨA TÌNH __ THẰNG BẠN TỒI 3 __ Nhạc Chế Đời __ Sến Chợ (128 kbps).mp3",
            image: "./assets/pictures/picture_20.jpg"
        },   
        {
            name: "Nhớ Thương Chỉ Là Hoang Phí",
            singer: "TVk x BeaZ",
            path:"./assets/music/y2meta.com - Nhớ Thương Chỉ Là Hoang Phí ( DN Team Remix ) - TVk x BeaZ _ Người hẹn người thề là trăm năm remix (128 kbps).mp3",
            image: "./assets/pictures/picture_21.jpg"
        },   
        {
            name: "Nên Chờ Hay Nên Quên",
            singer: "Phan Duy Anh",
            path:"./assets/music/y2meta.com - Nên Chờ Hay Nên Quên Remix l Phan Duy Anh Ft DJ Eric T-J (128 kbps).mp3",
            image: "./assets/pictures/picture_22.jpg"
        },   
        {
            name: "Nữ Nhi Tình",
            singer: "DJ Triệu Muzik",
            path:"./assets/music/y2meta.com - Nữ Nhi Tình Remix - Bản Mix Hay Nhất 2020 _ DJ Triệu Muzik _ 49 REMIX TV (128 kbps).mp3",
            image: "./assets/pictures/picture_23.jpg"
        },   
        {
            name: "Orb Sak Snea",
            singer: "PHUS Music",
            path:"./assets/music/y2meta.com - Orb Sak Snea Remix  - ARS ft Vy Sweetie Remix - PHUS Music (128 kbps).mp3",
            image: "./assets/pictures/picture_24.jpg"
        },   
        {
            name: "Phận Hoa Rơi",
            singer: "K-ICM X VICKY NHUNG",
            path:"./assets/music/y2meta.com - PHẬN HOA RƠI - K-ICM X VICKY NHUNG _ LONG NÓN LÁ COVER (128 kbps).mp3",
            image: "./assets/pictures/picture_25.jpg"
        },   
        {
            name: "Phụ Tình",
            singer: "Dj ",
            path:"./assets/music/y2meta.com - Phụ Tình Remix - Bản Remix Cực Hay (128 kbps).mp3",
            image: "./assets/pictures/picture_26.jpg"
        },   
        {
            name: "Quên Người Đã Quá Yêu",
            singer: "Hà Duy Thái",
            path:"./assets/music/y2meta.com - Quên Người Đã Quá Yêu (Orinn Remix) - Hà Duy Thái _ Nhạc Remix EDM Tik Tok Gây Nghiện Hay Nhất 2021 (128 kbps).mp3",
            image: "./assets/pictures/picture_27.jpg"
        },   
        {
            name: "Đêm Chờ Mấy Đêm",
            singer: "Tiktok",
            path:"./assets/music/y2meta.com - SAI ĐÊM NAY LÀ SAY ĐÊM MAI _ĐÊM CHỜ MẤY ĐÊM _ TikTok _ Remix _ NHẠC TRẺ HOT 2022 (128 kbps).mp3",
            image: "./assets/pictures/picture_28.jpg"
        },   
        {
            name: "Back To Hometown",
            singer: "Binz",
            path:"./assets/music/y2meta.com - Sol7 - Back To Hometown - Team Binz _ Rap Việt - Mùa 2  [MV Lyrics] (128 kbps).mp3",
            image: "./assets/pictures/picture_29.jpg"
        },   
        {
            name: "SpaceSpeakers",
            singer: "Freaky Squad",
            path:"./assets/music/y2meta.com - SpaceSpeakers - Freaky Squad (Official Music Video) (128 kbps).mp3",
            image: "./assets/pictures/picture_3.jpg"
        },   
        {
            name: "Sự Thật Đã Bỏ Quên",
            singer: "Hà Duy Thái",
            path:"./assets/music/y2meta.com - Sự Thật Đã Bỏ Quên Remix -- Hà Duy Thái (128 kbps).mp3",
            image: "./assets/pictures/picture_30.jpg"
        },   
        {
            name: "Tay Trái Chỉ Trăng",
            singer: "Dj Triệu",
            path:"./assets/music/y2meta.com - TAY TRÁI CHỈ TRĂNG - DJ TRIỆU MUZIK FT CM REMIX - 左手指月 - Upwards To The Moon (128 kbps).mp3",
            image: "./assets/pictures/picture_31.jpg"
        },   
        {
            name: "Thương người không thương",
            singer: "Phát Huy T4",
            path:"./assets/music/y2meta.com - Thương người không thương … (Phát Huy T4) remix (128 kbps).mp3",
            image: "./assets/pictures/picture_32.jpg"
        },   
        {
            name: "Thủy Triều",
            singer: "Phó Mộng Đồng",
            path:"./assets/music/y2meta.com - Thủy Triều Remix - Phó Mộng Đồng _ 傅梦彤 - 潮汐( Dj茂 ProgHouse Mix ) Bài Hát Hot Tik Tok Trung Quốc (128 kbps).mp3",
            image: "./assets/pictures/picture_33.jpg"
        },   
        {
            name: "Tokyo Drift",
            singer: "Teriyaki Boyz",
            path:"./assets/music/y2meta.com - Tokyo Drift - Teriyaki Boyz ( Dj Kantik Remix ) _ Nhạc Nền Hot Tik Tok 2020 _ AHQ Official (128 kbps).mp3",
            image: "./assets/pictures/picture_34.jpg"
        },   
        {
            name: "Váy Cưới",
            singer: "Trung Tự",
            path:"./assets/music/y2meta.com - Trung Tự - Váy Cưới ( Lofi Ver ) - ( Lyric Video ) - Nhạc Hot TikTok (128 kbps).mp3",
            image: "./assets/pictures/picture_35.jpg"
        },   
        {
            name: "Trở Lại Phố Cũ",
            singer: "Dj",
            path:"./assets/music/y2meta.com - Trở Lại Phố Cũ - Remix Bản Nhạc Gây nghiện Nhất 2019 (128 kbps).mp3",
            image: "./assets/pictures/picture_36.jpg"
        },   
        {
            name: "Tìm Lại Bầu Trời",
            singer: "Tuấn Hưng",
            path:"./assets/music/y2meta.com - Tìm Lại Bầu Trời Remix ( TuyenNV x NVK MUSIC) - Tuấn Hưng __ Nhạc Trẻ Remix Hay Nhất Gây Nghiện (128 kbps).mp3",
            image: "./assets/pictures/picture_37.jpg"
        },   
        {
            name: "Tình Đơn Phương 3",
            singer: "Hi Anh Trai",
            path:"./assets/music/y2meta.com - Tình Đơn Phương 3 (ATOM Remix) - Hi Anh Trai Cover (128 kbps).mp3",
            image: "./assets/pictures/picture_38.jpg"
        },   
        {
            name: "Tập Yêu Đi",
            singer: "Dj",
            path:"./assets/music/y2meta.com - Tập Yêu Đi Remix - Lk DJ Remix __ Nhạc Trẻ Remix 2021 Hot Tik Tok. (128 kbps).mp3",
            image: "./assets/pictures/picture_39.jpg"
        },   
        {
            name: "Từ Cửu Môn Hồi Ức",
            singer: "Chill",
            path:"./assets/music/y2meta.com - Từ Cửu Môn Hồi Ức Remix  Chill Ke    NHẠC REMIX HOT TIK TOK 2021 (128 kbps).mp3",
            image: "./assets/pictures/picture_4.jpg"
        },   
        {
            name: "Thiên Đàng",
            singer: "Wowy",
            path:"./assets/music/y2meta.com - WOWY - THIÊN ĐÀNG ft JOLIPOLI ( tại ELLE SHOW ) Full version (128 kbps).mp3",
            image: "./assets/pictures/picture_40.jpg"
        },   
        {
            name: "Xin Đừng Nhấc Máy",
            singer: "B Ray",
            path:"./assets/music/y2meta.com - Xin Đừng Nhấc Máy Remix (Bản Chuẩn Trên TikTok) - B RAY x HAN SARA - (Marrk Martinez Remix) (128 kbps).mp3",
            image: "./assets/pictures/picture_41.jpg"
        },   
        {
            name: "Đêm Trăng Tình Yêu",
            singer: "Dj",
            path:"./assets/music/y2meta.com - ĐEM TRĂNG TÌNH YÊU VGEE REMIX _ NHẠC HOT TIK TOK_ TB MEDIA (128 kbps).mp3",
            image: "./assets/pictures/picture_42.jpg"
        },   
        {
            name: "Đám Cưới Nha",
            singer: "Hồng Thanh",
            path:"./assets/music/y2meta.com - ĐÁM CƯỚI NHA_ - HỒNG THANH X MIE - Lần đầu biểu diễn cực sung!!! (128 kbps).mp3",
            image: "./assets/pictures/picture_43.jpg"
        },   
        {
            name: "Đơn Giản Em Yêu Anh",
            singer: "Ciray",
            path:"./assets/music/y2meta.com - Đơn Giản Em Yêu Anh (Ciray Remix) - Dunghoangpham x Phạm Bảo Nam _ Anh chẳng thể nào ngừng yêu em (128 kbps).mp3",
            image: "./assets/pictures/picture_44.jpg"
        },   
        {
            name: "Đỉnh Của Đỉnh",
            singer: "Team Rap",
            path:"./assets/music/y2meta.com - Đỉnh của đỉnh - Rhymastic, JustaTee, Wowy, Karik, Binz, Suboi lần đầu kết hợp _ Theme Song RAP VIỆT (128 kbps).mp3",
            image: "./assets/pictures/picture_45.jpg"
        },   
        {
            name: "Đời Trai Lênh Đênh",
            singer: "TLong",
            path:"./assets/music/y2meta.com - ĐỜI TRAI LÊNH ĐÊNH - TLong ( Fmajor Remix ) _ Nhạc Trẻ EDM Tik Tok Gây Nghiện Hay Nhất 2021 (128 kbps).mp3",
            image: "./assets/pictures/picture_46.jpg"
        },   
        {
            name: "Diamonds",
            singer: "Denver",
            path:"./assets/music/y2meta.com - ✈ Diamonds - Denver Remix __ NHẠC HOT TIK TOK (128 kbps).mp3",
            image: "./assets/pictures/picture_47.jpg"
        },   
        {
            name: "Chuyện Nàng Trinh Nữ Tên Thi",
            singer: "Sói ",
            path:"./assets/music/y2meta.com - ✈Chuyện Nàng Trinh Nữ Tên Thi Cực Chill - Việt Thi Cover _ Sói Dolce Mix _ Trưởng Còi Music (128 kbps).mp3",
            image: "./assets/pictures/picture_48.jpg"
        },   
        {
            name: "Phải Chia Tay Thôi",
            singer: "Quyền HP",
            path:"./assets/music/y2meta.com - ✈️ Phải Chia Tay Thôi Remix (Quyền HP) __ Nhạc Hót TikTok (128 kbps).mp3",
            image: "./assets/pictures/picture_49.jpg"
        },   
        {
            name: "Tương Tư Thành Hoạ",
            singer: "抖音DJ版",
            path:"./assets/music/y2meta.com - 郑亦辰 - 相思成灾 (抖音DJ版) Tương Tư Thành Hoạ (Remix Tiktok) __ China Mix New Song 2020 __ Hot Tiktok Douyin (128 kbps).mp3",
            image: "./assets/pictures/picture_5.jpg"
        },   
        {
            name: "Chỉ Cần Ai Đó Cạnh Bên Dừng lại",
            singer: "Minh Prod",
            path:"./assets/music/y2meta.com - 🎧Chỉ Cần Ai Đó Cạnh Bên Dừng lại...3107-2 Minh Prod Remix (128 kbps).mp3",
            image: "./assets/pictures/picture_50.jpg"
        },   
        {
            name: "Thế Giới Ảo Tình Yêu Thật",
            singer: "Mixcoud",
            path:"./assets/music/y2meta.com - 🤟 NONSTOP 2021_ THẾ GIỚI ẢO TÌNH YÊU THẬT - REMIX _ MIXCOUD VN _ Nhạc Trẻ Hot Tiktok 2021. (128 kbps).mp3",
            image: "./assets/pictures/picture_1.jpg"
        },   
        {
            name: "Day By Day",
            singer: "Ara",
            path:"./assets/music/ara-day-by-day-tiara-dei-bai-dei-beautiful-concert-20120821.mp3",
            image: "./assets/pictures/picture_10.png"
        },   
        {
            name: "Britney Spears",
            singer: "Ara",
            path:"./assets/music/britney-spears.mp3",
            image: "./assets/pictures/picture_11.jpg"
        },   
        {
            name: "Alive",
            singer: "Teddy",
            path:"./assets/music/y2mate.com - Alive  TEDDY X VeiruX  Hot Trend Tiktok  MAGUS (1).mp3",
            image: "./assets/pictures/picture_12.jpg"
        },   
        {
            name: "Criminal",
            singer: "King",
            path:"./assets/music/y2mate.com - CRIMINAL KING 44 REMIX HOT TIK TOK.mp3",
            image: "./assets/pictures/picture_13.jpg"
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