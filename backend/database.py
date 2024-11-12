import os
from supabase import create_client, Client

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def store_product_price(name, price):
    data = {
        "name": name,
        "price": price
    }
    supabase.table('apple_prices').insert(data).execute()

def get_product_prices():
    response = supabase.table('apple_prices').select('*').execute()
    return response.data
