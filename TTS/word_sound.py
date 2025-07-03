from gtts import gTTS
from playsound import playsound

words = ["семья", "мама", "папа", "брат", "сестра", "бабушка", "дедушка", "тетя", "дядя"];

language = "ru"
for word in words:
    filename = f"{word}.mp3"
    tts = gTTS(text=word, lang=language)
    tts.save(filename)
    print(f"Saved {filename}")