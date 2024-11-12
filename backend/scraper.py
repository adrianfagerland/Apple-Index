import logging

import httpx
from bs4 import BeautifulSoup
from config import settings
from supabase import Client, create_client

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Supabase client
supabase: Client = create_client(settings.supabase_url, settings.supabase_key)


def scrape_apple_prices():
    url = "https://www.apple.com/shop/buy-iphone"
    response = httpx.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    products = []
    for product in soup.select(".as-producttile-tilelink"):
        name = product.select_one(".as-producttile-title").text.strip()
        price = product.select_one(".as-price-currentprice").text.strip()
        products.append({"name": name, "price": price})

    logger.info(f"Scraped {len(products)} products")
    return products


def store_prices_in_db(products):
    for product in products:
        data = {"name": product["name"], "price": product["price"]}
        supabase.table("apple_prices").insert(data).execute()
        logger.info(f"Inserted product {product['name']} into database")
