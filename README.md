Android Patient App

This is a scaffolded Android app (Kotlin) that connects to the FastAPI backend `/chat` endpoint.

Defaults
- Base URL: http://10.0.2.2:8001/ (useful for Android emulator)

Features
- Retrofit + Coroutines networking
- Room DB to persist last chats
- Hilt DI
- ViewModel + StateFlow for UI
- Basic UI scaffold (RecyclerView + input)

How to open
1. Open `android_patient_app` in Android Studio.
2. Build and run on Android emulator (API 24+).

Tests
- Unit test for `ChatApi` using MockWebServer.
- Placeholder UI test in androidTest for ChatActivity (Espresso to be added).
