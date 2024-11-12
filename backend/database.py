from supabase import Client, create_client

from .config import settings

# Initialize Supabase client
supabase: Client = create_client(settings.supabase_url, settings.supabase_key)


def store_product_price(name, price):
    data = {"name": name, "price": price}
    supabase.table("apple_prices").insert(data).execute()


def get_product_prices():
    response = supabase.table("apple_prices").select("*").execute()
    return response.data
