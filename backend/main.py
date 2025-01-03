from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from bson import ObjectId
from typing import List
from models import create_thought, thought, PostLikeCount
from contextlib import asynccontextmanager
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
load_dotenv()

DATABASE_NAME = "notalone"
COLLECTION_NAME = "thoughts"
MONGODB_URI = os.environ["MONGODB_URI"]

@asynccontextmanager
async def get_mongo_client(app: FastAPI):
    client = AsyncIOMotorClient(MONGODB_URI)
    database = client[DATABASE_NAME]

    pong = await database.command("ping")
    if int(pong["ok"]) != 1:
        raise Exception("Cluster connection is not okay!")

    thoughts_list = database.get_collection(COLLECTION_NAME)
    app.list = thoughts_list

    yield

    client.close()

app = FastAPI(lifespan=get_mongo_client, title="NotAlone API", description="API for NotAlone Website")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173", "https://youarenotunknown.netlify.app"],
    allow_origin_regex=r"https://.*youarenotunknown\.netlify\.app.*",
    allow_credentials=True,
    allow_methods=["GET", "HEAD", "PUT", "POST", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get('/favicon.ico', include_in_schema=False)
async def favicon():
    return FileResponse("favicon.ico")

@app.post("/thoughts", response_model=thought, status_code=status.HTTP_201_CREATED)
async def create_post(post: create_thought):
    post_dict = post.model_dump()
    post_dict["created_at"] = datetime.now(timezone.utc)
    post_dict["likes"] = 0
    
    result = await app.list.insert_one(post_dict)
    created_post = await app.list.find_one({"_id": result.inserted_id})
    return thought(**created_post)

@app.get("/thoughts", response_model=List[thought])
async def get_thoughts(skip : int = 0, limit: int = 40):
    thoughts = await app.list.find().sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return thoughts

@app.get("/thoughts/{thought_id}", response_model=thought)
async def get_thought(thought_id: str):
    try:
        thought = await app.list.find_one({"_id": ObjectId(thought_id)})
        if thought is None:
            raise HTTPException(status_code=404, detail="Post not found")
        return thought
    except:
        raise HTTPException(status_code=404, detail="Post not found")
    
@app.get("/thoughts/like/{thought_id}", response_model=PostLikeCount)
async def get_thought(thought_id: str):
    try:
        thought = await app.list.find_one({"_id": ObjectId(thought_id)}, projection={"likes": 1})
        if thought is None:
            raise HTTPException(status_code=404, detail="Post not found")
        return PostLikeCount(likes=thought.get("likes", 0))
    except:
        raise HTTPException(status_code=404, detail="Post not found")
    
@app.put("/thoughts/like/{thought_id}", response_model=thought)
async def like_post(thought_id: str):
    try:
        post = await app.list.find_one_and_update(
            {"_id": ObjectId(thought_id)},
            {"$inc": {"likes": 1}},
            return_document=True
        )
        if post is None:
            raise HTTPException(status_code=404, detail="Post not found")
        return post
    except Exception:
        raise HTTPException(status_code=404, detail="Post not found")
    
@app.delete("/thoughts/{thought_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(thought_id: str):
    try:
        result = app.list.delete_one({"_id": ObjectId(thought_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Post not found")
    except Exception:
        raise HTTPException(status_code=404, detail="Post not found")
    
@app.get("/thoughts/stats/count")
async def get_count():
    total = await app.list.count_documents({})
    return { "total_posts": total }