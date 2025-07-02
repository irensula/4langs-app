from gtts import gTTS
from playsound import playsound

words = ["mother", "father", "brother", "sister", "grandmother", "grandfather", "aunt", "uncle"]
language = "en"
for word in words:
    filename = f"{word}.mp3"
    tts = gTTS(text=word, lang=language)
    tts.save(filename)
    print(f"Saved {filename}")