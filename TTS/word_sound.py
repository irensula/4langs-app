from gtts import gTTS
from playsound import playsound

words = ['school', 'teacher', 'student', 'book', 'pen', 'pencil', 'notebook', 'classroom', 'group', 'desk'];

language = "uk"
for word in words:
    filename = f"{word}.mp3"
    tts = gTTS(text=word, lang=language)
    tts.save(filename)
    print(f"Saved {filename}")