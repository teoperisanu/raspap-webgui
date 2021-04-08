from repo import JsonRepo
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

repo = JsonRepo('synchrona14.json')
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Mode(BaseModel):
    name: str
    output: Optional[str] = None


class Channel(BaseModel):
    id: int
    enable: bool
    mode: Optional[Mode]
    reference: str
    frequency: int
    slip: int
    digital_delay: int
    analog_delay: int


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/synchrona/channels/{ch_id}")
async def read_item(ch_id: int):
    return repo.read_ch(ch_id)


@app.patch("/synchrona/channels/{ch_id}", response_model=Channel)
async def update_item(ch_id: int, ch: Channel):
    return repo.update_ch(ch)
