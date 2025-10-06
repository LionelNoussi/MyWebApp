import fastapi
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = fastapi.FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

pages = ["index", "education", "cv", "projects", "publications"]


@app.get("/", name="home")
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/{page_name}")
def serve_page(request: Request, page_name: str):
    if page_name not in pages:
        page_name = "error"
    return templates.TemplateResponse(f"{page_name}.html", {"request": request})
