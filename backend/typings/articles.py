from dataclasses import dataclass
from typing import List, Optional


@dataclass
class Article(dict):
    dirname: str
    title: str
    description: str
    created_date: float
    reading_time: int
    cover: str
    url: str
    render: Optional[str]


Articles = List[Article]
