
import speech_recognition as sr
from gtts import gTTS
import os
import asyncio
import glob
from rasa.core.agent import Agent

# Note: display(Audio(...)) might not work as expected when run via !python3.10
# We will print messages instead.

# Load latest model
models_dir = "/content/drive/MyDrive/chatbot/models"
try:
    latest_model = "/content/drive/MyDrive/chatbot/models/latest.tar.gz"
    print("Loading model:", latest_model)
    agent = Agent.load(latest_model)
except ValueError:
    print("No Rasa model found in the specified directory.")
    exit()


def listen_sinhala():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Speak now (Sinhala)...")
        try:
            audio = r.listen(source, timeout=5) # Add a timeout for listening
            return r.recognize_google(audio, language="si-LK")
        except sr.WaitTimeoutError:
            print("Listening timed out.")
            return None
        except sr.UnknownValueError:
            print("Could not understand audio.")
            return None
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {{e}}")
            return None
        except Exception as e:
            print(f"An error occurred during listening: {{e}}")
            return None


def speak_sinhala(text):
    print(f"Bot will speak: {{text}}")
    # gTTS and Audio display might not work directly in this execution method.
    # You might need to run this part in a separate notebook cell or handle audio output differently.
    try:
        tts = gTTS(text=text, lang="si")
        tts.save("reply.mp3")
        # In a regular Python script, you might use a library to play the mp3 file.
        # For this Colab context running as a script, we'll just confirm the file is saved.
        print("Audio saved to reply.mp3")
    except Exception as e:
        print(f"An error occurred during text-to-speech: {{e}}")


async def voice_chat():
    print("Starting voice chat. Say 'අවසන්', 'quit', or 'exit' to end.")
    while True:
        msg = listen_sinhala()
        if msg:
            print(f"You: {{msg}}")
            if msg.lower() in ["අවසන්", "quit", "exit"]:
                speak_sinhala("සමුගන්නවා! ඔබ සෞඛ්‍යවන්තව සිටින්න.")
                break
            responses = await agent.handle_text(msg)
            if responses:
                for r in responses:
                    reply = r.get("text")
                    if reply: # Check if the reply is not empty
                        print("Bot:", reply)
                        speak_sinhala(reply)
                    else:
                        print("Bot: (No text response)")
            else:
                print("Bot: (No response from agent)")
        else:
            print("Could not process audio.")


if __name__ == "__main__":
    # Need to handle async within the script execution
    asyncio.run(voice_chat())

