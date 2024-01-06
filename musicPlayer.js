const songs=[
    {
        id:0,
        name:'chịu cách mình nói thua',
        singer: 'ryder',
        path: 'ChiuCachMinhNoiThua-RHYDERCoolkidBAN-12449134.mp3',
        image: 'download.jpg'
    },
    {
        id:1,
        name:'chúng ta không thuộc về nhau',
        singer: 'sơn tùng mtp',
        path: 'ChungTaKhongThuocVeNhau-SonTungMTP-4528181.mp3',
        image: '1503305440699_640.jpg'
    },
    {
        id:2,
        name:'nhắn nhủ',
        singer: 'ronboogz',
        path: 'NhanNhu-Ronboogz-12896660.mp3',
        image: 'cde3e519a909b44385c220c8ad6b92bc.jpg'
    },
    {
        id:3,
        name:'loi nhoi',
        singer: 'WREN EVANS',
        path: 'ToTeTi-WrenEvans-13082104.mp3',
        image: 'elleman-Wren-Evans-ra-mat-album-Loi-Choi_03-2048x2048-1.jpeg'
    },
    {
        id:4,
        name:'buồn hay vui',
        singer: 'obito',
        path: 'BuonHayVuiFeatRptMckObitoRonboogz-VSOULRPTMCKObitoRonboogz-13159599.mp3',
        image: '1703492891550_640.jpg'
    },
    {
        id:5,
        name:'nếu lúc đó',
        singer: 'tlinh',
        path: 'NeuLucDo-tlinh2pillz-8783613.mp3',
        image: '1677482230509_640.jpg'
    },
    {
        id:6,
        name:'thằng điên',
        singer: 'JustaTee-PhuongLy',
        path: 'ThangDienLofiVersion-JustaTeePhuongLyNSRecords-7611741.mp3',
        image: 'artworks-000437920515-uq0j2a-t500x500.jpg'
    },
    {
        id:7,
        name:'tại vì sao',
        singer: 'MCK',
        path: 'jibj864m97.mp3',
        image: '1679563297490_640.jpg'
    },
    {
        id:8,
        name:'Chỉ cần được ngồi đây với em',
        singer: 'D.Kies',
        path: 'ChiCanDuocNgoiDayVoiEm-DKies-12071935.mp3',
        image: 'ccf5db8786a4143b7defb0e35760ac07.jpg'
    },
    {
        id:9,
        name:'muốn nói với em',
        singer: 'DT Tập Rap ft Mai Xuân Thứ',
        path: 'MuonNoiVoiEm-TTeam-6288870.mp3',
        image: '29bf1c15a2aeacf72a2fa1e84d92f3e9.jpg'
    },
]
let isVolume=true;
let isPlay=true;
let ismusic=true;
let numberId=0;
const playLists=document.querySelector('.playLists')
const currenllyIndex=0;
const songName=document.querySelector('.song-string')
const imgPlaylist=document.querySelector('.songRapViet.animation')
const audio=document.querySelector('.audio')
const songXoay=document.querySelector('.songImg')
const controlNext=document.querySelector('.songControl.next')
const controlBack=document.querySelector('.songControl.back')
const songRun=document.querySelector('.songRun')
const controlLoad= document.querySelector('.songControl.load')
const controlPlaying=document.querySelector('.songControl.playing')
const controlBackMusic= document.querySelector('.songControl.backMusic')
const iVolume =document.querySelector('.volume')
songName.textContent=songs[currenllyIndex].name,
imgPlaylist.src=songs[currenllyIndex].image;
audio.src=songs[currenllyIndex].path;
function start(){
    handle()
    render()
}
start()
function render(){
    const htmls= songs.map(function(song){
        return`
        <div class="song-${song.id} songName" onclick="handlesong(${song.id})" style="display:flex; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1); margin-bottom: 25px;cursor: pointer;">
        <div><img class="image" style="width: 60px; height : 60px; border-radius: 50%;" src="${song.image}" alt=""></div>
        <div style="display:flex; justify-content:space-between; width:100%;">
        <div class="tagName" style="display:flex;flex-direction: column; margin-left:30px ">
        <h4 style=" font-size: 20px;" >${song.name}</h4>
        <p>${song.singer}</p>
        </div>
        <div class="ti-more-alt" style=" " ></div>
        </div>
        </div>
        `
    })
    playLists.innerHTML=htmls.join('')
    const songPlayred=document.querySelector('.song-'+numberId)
songPlayred.classList.add('active')
}
function handle(){
    const cd=document.querySelector('.song-img')
    const cdwidth=cd.offsetWidth;
    document.onscroll=function(){
        const cdwidthTop=window.scrollY;
        const newcdwidth=cdwidth-cdwidthTop;
        cd.style.width=newcdwidth+'px'
        cd.style.opacity=newcdwidth/cdwidth
    }
    audio.ontimeupdate=function(){
        if(audio.duration)
        {
            const runWidth= Math.floor(audio.currentTime*100/audio.duration)
            songRun.value=runWidth
        }
    }
    controlBackMusic.onclick= function(){
        if(ismusic)
        {
            ismusic=false;
            controlBackMusic.classList.add('active')
        }
        else{
            ismusic=true;
            controlBackMusic.classList.remove('active')
        }
    }
    audio.onended =function(){
        if(ismusic){
            handleNext()
        }
        else{
            numberId=numberId-1;
            handleNext()
        }
    }
    iVolume.onchange=function(){
        audio.volume=iVolume.value/100
    }
    songRun.onchange=function(){
        audio.currentTime=songRun.value*audio.duration/100
    }
    controlPlaying.onclick=function(){
        getPlaying()
    }
    controlBack.onclick=function(){
        handleBack()
    }
    controlNext.onclick=function(){
        handleNext()
    }
    controlLoad.onclick= function(){
        audio.currentTime=0;
    }
}
function handlesong(id){
    numberId=id;
    songName.textContent=songs[id].name;
    imgPlaylist.src=songs[id].image;
    audio.src=songs[id].path;
    const songACtive=document.querySelector('.songName.active')
    songACtive.classList.remove('active')
    const songPlay=document.querySelector('.song-'+numberId)
    songPlay.classList.add('active')
    isPlay=true;
    isActive=true
    getPlaying()
}

function getPlaying(){
    if(isPlay){
        isPlay=false,
        controlPlaying.classList.add('ti-control-pause')
        imgPlaylist.style.animationPlayState ='running',
    audio.play()
    }
    else{
        isPlay=true,
    controlPlaying.classList.remove('ti-control-pause')
    audio.pause()
    imgPlaylist.style.animationPlayState ='paused'
    }
}
function handleBack(){
if(numberId===0)
getPlaying();

else{
    handlesong(numberId-1);
}
}
function handleNext(){
var maxId=0;
for(song of songs)
{
if(maxId<song.id)
maxId=song.id;
}
if(maxId===numberId)
{
    numberId=0;
handlesong(numberId)  ;  
}
else{
    handlesong(numberId+1);
}
}
