# main.py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from di import global_injector
from fastapi.responses import HTMLResponse
from dotenv import load_dotenv
import os
from fastApp import create_app
import uvicorn

load_dotenv()
app = create_app(global_injector)


@app.get("/")
async def read_root():
   return {"response": "InterQ API is Running"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5050)