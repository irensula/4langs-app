from gtts import gTTS
from playsound import playsound

words = ['сестра', 'брат'];

language = "ru"
for word in words:
    filename = f"{word}.mp3"
    tts = gTTS(text=word, lang=language)
    tts.save(filename)
    print(f"Saved {filename}")