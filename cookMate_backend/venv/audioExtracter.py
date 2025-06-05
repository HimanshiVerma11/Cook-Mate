import yt_dlp

def get_audio_stream_url(video_url, filename="audio"):
    ydl_opts = {
       'format': 'bestaudio/best',
       'quiet': True,
       'noplaylist': True,
       'outtmpl': filename,
       'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download(video_url)