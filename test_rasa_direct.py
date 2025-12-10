
import asyncio
import glob
import os
from rasa.core.agent import Agent

async def test_bot():
    models_dir = "/content/drive/MyDrive/chatbot/models"
    latest_model = "/content/drive/MyDrive/chatbot/models/latest.tar.gz"
agent = Agent.load(latest_model)
    print("Loading model:", latest_model)

    # Load the agent
    agent = Agent.load(latest_model)

    test_messages = [
        "ආයුබෝවන්",
        "මගේ HbA1c 7.2",
        "What is my risk?", # This might not be understood as it's in English
        "මගේ ඊළඟ වෛද්‍ය පරීක්ෂණය 2025-11-02"
    ]
    print("Testing bot with messages:")
    for msg in test_messages:
        print(f"\n--- You: {{msg}} ---")
        responses = await agent.handle_text(msg)
        if responses:
            for r in responses:
                print("Bot:", r.get("text"))
        else:
            print("Bot: (No response)")

asyncio.run(test_bot())
