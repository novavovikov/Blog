from dataclasses import dataclass
from typing import List


@dataclass
class FrontendEvent:
    uid: str
    start: str
    end: str
    summary: str
    location: str
    description: str
    allDay: bool


FrontendEvents = List[FrontendEvent]


@dataclass
class KotlinEvent:
    lang: str
    startDate: str
    endDate: str
    location: str
    speaker: str
    title: str
    subject: str
    url: str
    description: bool


KotlinEvents = List[KotlinEvent]
