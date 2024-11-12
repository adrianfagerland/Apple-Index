import requests
from bs4 import BeautifulSoup
import os
from supabase import create_client, Client

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def scrape_apple_prices():
    url = "https://www.apple.com/shop/buy-iphone"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    products = []
    for product in soup.select('.as-producttile-tilelink'):
        name = product.select_one('.as-producttile-title').text.strip()
        price = product.select_one('.as-price-currentprice').text.strip()
        products.append({'name': name, 'price': price})

    return products

def store_prices_in_db(products):
    for product in products:
        data = {
            "name": product['name'],
            "price": product['price']
        }
        supabase.table('apple_prices').insert(data).execute()

if __name__ == "__main__":
    products = scrape_apple_prices()
    store_prices_in_db(products)
