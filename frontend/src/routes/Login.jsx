import os
from dotenv import load_dotenv

from fastapi import APIRouter, Request, Form
from fastapi.templating import Jinja2Templates

from supabase_py import create_client, Client

router = APIRouter()
templates = Jinja2Templates(directory="templates")

load_dotenv() # Load environment variables from .env

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY") 

supabase: Client = create_client(supabase_url, supabase_key)

@router.get("/login")
async def get_login(request: Request):
    # ...

@router.post("/login")  
async def post_login(
    email: str = Form(),
    password: str = Form()   
):
    # ...