
import asyncio
import glob
import os
from rasa.core.agent import Agent

async def test_bot():
    models_dir = "/content/drive/MyDrive/chatbot/models"
    latest_model = max(glob.glob(f"{models_dir}/*.tar.gz"), key=os.path.getctime)
    agent = Agent.load(latest_model)
    test_messages = [
        "ආයුබෝවන්",
        "මම කන්න ඕනේ ආහාර මොනවාද?",
        "මගේ ඖෂධ ගැන කියන්න",
        "ගිහින් එන්නම්"
    ]
    for msg in test_messages:
        responses = await agent.handle_text(msg)
        print(f"You: {msg}")
        for r in responses:
            print("Bot:", r.get("text"))
        print()

asyncio.run(test_bot())
