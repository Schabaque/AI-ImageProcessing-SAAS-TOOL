import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get MongoDB URI from .env
MONGO_URI = os.getenv("MONGODB_URI")
if not MONGO_URI:
    raise EnvironmentError(" MONGODB_URI not found in .env file.")

try:
    # Connect to MongoDB
    client = MongoClient(MONGO_URI)
    client.admin.command("ping")  # Test connection
    print("✅ MongoDB connection established successfully!")

    # Select your database
    db = client["ImageApp"]

    # Collections
    user_collection = db["users"]
    image_link_collection = db["user_image_link"]

except Exception as e:
    raise ConnectionError(f"Failed to connect to MongoDB: {e}")
