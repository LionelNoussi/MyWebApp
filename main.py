import fastapi
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel


class Temperature(BaseModel):
    temp: float

app = fastapi.FastAPI()

current_temperature: Temperature = Temperature(temp=25.0)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

pages = ["index", "education", "cv", "projects", "publications", "temperature"]


@app.get("/", name="home")
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/post_temperature")
def post_temperature(temperature: Temperature):
    global current_temperature
    current_temperature = temperature
    return temperature

@app.get("/{page_name}")
def serve_page(request: Request, page_name: str):
    if page_name not in pages:
        page_name = "error"
    return templates.TemplateResponse(f"{page_name}.html", {"request": request, "Temperature": current_temperature.temp})



