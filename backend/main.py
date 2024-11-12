from apscheduler.schedulers.blocking import BlockingScheduler
from scraper import scrape_apple_prices, store_prices_in_db


def scheduled_job():
    products = scrape_apple_prices()
    store_prices_in_db(products)


if __name__ == "__main__":
    scheduler = BlockingScheduler()
    scheduler.add_job(scheduled_job, "interval", days=1)
    scheduler.start()
