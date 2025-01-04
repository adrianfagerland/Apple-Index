from typing import Dict, Optional, Union

from pydantic import BaseModel, RootModel, field_validator


class Variation(BaseModel):
    screen_size: Optional[int] = None
    chip: Optional[str] = None
    storage: Optional[str] = None
    memory: Optional[int] = None
    gpu_count: Optional[int] = None
    id: Optional[str] = None
    prices: Optional[dict[str, float]] = None
    form_factor: Optional[str] = None
    glass: Optional[str] = None
    connectivity: Optional[str] = None
    model: Optional[str] = None
    case: Optional[str] = None
    size: Optional[int] = None

    @field_validator("prices")
    def convert_prices_to_float(
        cls, prices: Optional[Dict[str, Union[str, float]]]
    ) -> Optional[Dict[str, float]]:
        if prices is None:
            return None

        return {
            country: float(price) if isinstance(price, str) else price
            for country, price in prices.items()
        }

class Products(RootModel):
    root: dict[str, list[Variation]]