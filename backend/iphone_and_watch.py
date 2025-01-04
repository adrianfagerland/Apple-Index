import json
import re

import requests
from bs4 import BeautifulSoup


def get_product_selection_data(url):
    """
    Fetches the HTML content from the given URL, extracts the
    window.PRODUCT_SELECTION_BOOTSTRAP.productSelectionData, and returns it as a Python dictionary.

    Args:
        url: The URL of the Apple product page.

    Returns:
        A dictionary containing the productSelectionData, or None if an error occurred.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes

        soup = BeautifulSoup(response.content, "html.parser")

        # Find the script tag containing the desired data
        script_tag = soup.find(
            "script",
            string=lambda text: text and "window.PRODUCT_SELECTION_BOOTSTRAP" in text,
        )

        if script_tag:
            # Extract the JavaScript code as a string
            js_string = script_tag.string

            # Find the start and end of the JSON data
            start_index = js_string.find("{")
            end_index = js_string.rfind("}") + 1

            # Extract the JSON string
            json_string = js_string[start_index:end_index]

            json_string = json_string.strip("{").strip("}").strip("")
            json_string = re.sub(r"productSelectionData:", "", json_string).strip()

            # Parse the JSON string into a Python dictionary
            product_selection_data = json.loads(json_string)

            return product_selection_data
        else:
            print("Could not find the script tag containing productSelectionData.")
            return None

    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None

from typing import Dict, List, Optional
from pydantic import BaseModel, Field, validator

class CurrentPrice(BaseModel):
    amount: str
    raw_amount: str

class Price(BaseModel):
    product: str
    carrierProduct: str
    hideCarrierTextFromSelectors: bool
    amountBeforeTradeIn: float
    amountAfterTradeIn: float
    threadName: str
    validProducts: List[str]
    validCarrierProducts: List[str]
    comparativeDisplayPrice: str
    comparativeDisplayPrice_short: str = Field(alias="comparativeDisplayPrice-short")
    financing: str
    financing_short: str = Field(alias="financing-short")
    priceMessageForStep1: str
    currentDisplayPrice: str
    currentDisplayPrice_short: str = Field(alias="currentDisplayPrice-short")
    priceFeeDisclaimer: str
    creditOffer: Dict
    priceCurrency: str
    partNumber: str
    showItemPropPrice: bool
    showItemPropAvailability: bool
    showPromoAsIncludes: bool
    showPayPal: bool
    showDynamicFinancing: bool
    chooseDefaultPurchaseOption: bool
    basePartNumber: str
    refurbProduct: bool
    adjustedPrice: Dict
    currentPrice: CurrentPrice

class DisplayValues(BaseModel):
    prices: Dict[str, Price]

class ProductData(BaseModel):
    displayValues: DisplayValues

# Define your base part numbers
base_part_numbers = ["MYWQ3", "MYN93", "MYWH3", "MYN23"]

# Extract raw prices, currency, and base part numbers using Pydantic
# Example usage:
url = "https://www.apple.com/jp/shop/buy-iphone/iphone-16-pro"
data = get_product_selection_data(url)

product_data = ProductData(**data)

for price_key, price_info in product_data.displayValues.prices.items():
    print(f"Price Key: {price_key}")
    print(f"  Raw Price: {price_info.currentPrice.raw_amount}")
    print(f"  Currency: {price_info.priceCurrency}")
    print(f"  Base Part Number: {price_info.basePartNumber}")

    # Check against your list of base part numbers
    if price_info.basePartNumber in base_part_numbers:
        print(f"    Base part number {price_info.basePartNumber} found in your list.")
    else:
        print(f"    Base part number {price_info.basePartNumber} NOT found in your list.")
    print("-" * 20)
