from scraper import scrape_apple_prices, store_prices_in_db


def scheduled_job():
    products = scrape_apple_prices()
    store_prices_in_db(products)


def lambda_handler(event, context):
    scheduled_job()
