from fastapi import FastAPI, File, UploadFile,HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from routes.signup import router as sign_up
from routes.login import router as sign_in

from pymongo import MongoClient
from db import db
from dotenv import load_dotenv

app=FastAPI()

load_dotenv()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://ghxifysweoqvrqntieib.supabase.co/storage/v1/s3/*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(sign_up)

app.include_router(sign_in)




@app.get("/")
async def read_root():
    try:
        db.command("ping")
        return {"BackEnd":"is Working","MongoDB":"Connected"}
    except Exception as e:
        return JSONResponse(content={"error":str(e)},status_code=500)
    
# if __name__ == '__main__':
#     import uvicorn
#     uvicorn.run(app)