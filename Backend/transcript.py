import whisper


def create_transcript():
    model = whisper.load_model("base")
    result = model.transcribe("audio.mp3")

    with open("transcript.txt", "w", encoding="utf-8") as f:
        f.write(result["text"])

