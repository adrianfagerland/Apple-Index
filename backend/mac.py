import asyncio
from typing import Dict, List

import httpx
from pydantic import BaseModel

from countries import COUNTRIES

url_prefix = "shop/updateFinanceSummary?node=home/shop_mac/family/macbook_air&bfil=2"


class RawPrice(BaseModel):
    price: str


class PriceString(BaseModel):
    raw: RawPrice


class PriceData(BaseModel):
    fullPrice: PriceString


class FinancingData(BaseModel):
    priceData: PriceData


class Body(BaseModel):
    financing: Dict[str, FinancingData]


class Head(BaseModel):
    status: str
    data: Dict


class Data(BaseModel):
    head: Head
    body: Body


def build_urls(ids: List[str]) -> List[str]:
    urls: dict[str, str] = {}
    for country, url in COUNTRIES.items():
        params = []
        for idx, part_id in enumerate(ids):
            params.append(f"parts.{idx}={part_id}")
        urls[country] = f"https://{url}{url_prefix}&{'&'.join(params)}"
    return urls


async def fetch_url(client: httpx.AsyncClient, url: str) -> Dict:
    try:
        response = await client.get(url)
        response = response.json()
        for part_to_delete in [
            "acmiEligibleNote",
            "acmiDisclaimerText",
            "priceSubText",
            "acmiFinancePresent",
            "priceSeparator",
        ]:
            del response["body"]["financing"][part_to_delete]
        return Data(**response)
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None


async def get_product_prices(urls: dict[str, str]) -> dict[str, Dict]:
    results: dict[str, Dict] = {}
    async with httpx.AsyncClient(timeout=30.0) as client:
        # Create tasks with country tracking
        tasks = [(country, fetch_url(client, url)) for country, url in urls.items()]

        # Wait for all requests to complete
        responses = await asyncio.gather(
            *(task[1] for task in tasks), return_exceptions=True
        )

        # Map responses back to countries
        for (country, _), response in zip(tasks, responses):
            results[country] = response

        return results
