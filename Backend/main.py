from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from audioExtracter import get_audio_stream_url
from transcript import create_transcript
from AIModel import AIModel






app = FastAPI()

# Enable CORS so frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class URL(BaseModel):
    url : str


@app.post("/main")
async def root(link:URL):

    #call audio extracter
    get_audio_stream_url(link.url)

    #call transcript creator
    create_transcript()

    #call AI model
    response =  AIModel()
    if(response):
     return response
    else:
       return {"response": "An error occurred!"}
    



@app.get("/health")
def health_check():
   return {"status":"ok"}


@app.head("/")
def health_check_head():
    return 
    
